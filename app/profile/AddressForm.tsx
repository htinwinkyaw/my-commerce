"use client";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";

import { Address } from "@prisma/client";
import { AddressFormMode } from "@/types/enum";
import Button from "../_components/ui/Button";
import CustomSelect from "../_components/CustomSelect";
import Heading from "../_components/ui/Heading";
import Input from "../_components/ui/Input";
import TextArea from "../admin/add-product/TextArea";
import axios from "axios";
import { postalCodes } from "../_utils/postalCodes";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface Props {
  address?: Address | null;
}

const AddressForm: React.FC<Props> = ({ address }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [tspOptions, setTspOptions] = useState<string[]>([]);
  const [selectedTownship, setSelectedTownship] = useState<string | null>(null);
  const [postalOptions, setPostalOptions] = useState<string[]>([]);

  const {
    register,
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      receiverName: address ? address.receiverName : "",
      phone: address ? address.phone : "",
      line: address ? address.line : "",
      state: address ? address.state : "default",
      township: address ? address.township : "default",
      postalCode: address ? address.postalCode : "default",
      deliveryNote: address ? address.deliveryNote : "",
    },
  });

  const stateOptions = postalCodes.map((item) => {
    return item.state.name;
  });

  useEffect(() => {
    if (address) {
      setSelectedState(address.state);
      setSelectedTownship(address.township);
    }
  }, [address]);

  useEffect(() => {
    if (!selectedState) return;

    if (selectedState) {
      const selectedStateData = postalCodes.find((item) => {
        return item.state.name === selectedState;
      });

      if (selectedStateData) {
        const townships = selectedStateData.state.townships.map((township) => {
          return township.name.eng;
        });

        setTspOptions(townships);

        if (selectedTownship) {
          const selectedTownshipData = selectedStateData.state.townships.find(
            (township) => {
              return township.name.eng === selectedTownship;
            }
          );

          if (selectedTownshipData) {
            const codes = selectedTownshipData?.postalCodes;

            setPostalOptions(codes);
          }
        }
      }
    }
  }, [selectedState, selectedTownship]);

  const handleDelete = async (id: string) => {
    setDeleting(true);
    try {
      const res = await axios.delete(`/api/addresses/${id}`);
      if (res.data.status === 400) {
        toast.error(res.data.message);
      }
      if (res.data.status === 204) {
        toast.success(res.data.message);
        router.push("/profile");
        router.refresh();
      }
    } catch (err) {
      toast.error("Failed to delete address.");
    } finally {
      setDeleting(false);
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setLoading(true);

    if (
      data.state === "default" ||
      data.township === "default" ||
      data.postalCode === "default"
    ) {
      toast.error("Please select the address location.");
      setLoading(false);
      return;
    }

    try {
      const endpoint = address
        ? `/api/addresses/${address.id}`
        : "/api/addresses";

      const response = address
        ? await axios.put(endpoint, data)
        : await axios.post(endpoint, data);

      console.log(response);

      if (response.data.status === 200 || response.data.status === 201) {
        toast.success(response.data.message);

        router.back();
        router.refresh();
      }

      if (response.data.status === 500) {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(`Failed to ${address ? "update " : "add new "} address.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <Heading title="Address Form" center />

      <Input
        label="Receiver Name"
        id="receiverName"
        register={register}
        errors={errors}
        control={control}
        required
        disabled={loading}
      />

      <Input
        label="Phone Number"
        id="phone"
        register={register}
        errors={errors}
        control={control}
        required
        disabled={loading}
      />

      <Input
        label="Address"
        id="line"
        register={register}
        errors={errors}
        control={control}
        required
        disabled={loading}
      />

      <CustomSelect
        label="Choose state or division"
        id="state"
        options={stateOptions}
        register={register}
        errors={errors}
        control={control}
        setValue={setValue}
        onSelect={setSelectedState}
        defaultValue={address ? address.state : ""}
        mode={address ? AddressFormMode.Edit : AddressFormMode.Create}
        disabled={loading}
      />

      <CustomSelect
        label="Choose Township"
        id="township"
        options={tspOptions}
        register={register}
        errors={errors}
        control={control}
        setValue={setValue}
        disabled={loading}
        defaultValue={address ? address.township : ""}
        mode={address ? AddressFormMode.Edit : AddressFormMode.Create}
        onSelect={setSelectedTownship}
      />

      <CustomSelect
        label="Choose Postal Code"
        id="postalCode"
        options={postalOptions}
        register={register}
        errors={errors}
        control={control}
        setValue={setValue}
        disabled={loading}
        mode={address ? AddressFormMode.Edit : AddressFormMode.Create}
        defaultValue={address ? address.postalCode : ""}
      />

      <TextArea
        label="Delivery Note (Optional)"
        id="deliveryNote"
        register={register}
        errors={errors}
        required={false}
        disabled={loading}
      />

      <div className="flex flex-row justify-between gap-1">
        <Button
          label="Cancel"
          onClick={() => {
            router.back();
          }}
          disabled={loading}
          outline
        />
        <Button
          label={
            loading
              ? address
                ? "Updating..."
                : "Adding..."
              : address
              ? "Update Address"
              : "Add Address"
          }
          onClick={handleSubmit(onSubmit)}
          disabled={loading}
        />
      </div>

      {address && (
        <Button
          label={deleting ? "Deleting..." : "Delete this address."}
          onClick={handleDelete.bind(null, address.id)}
          custom="border-rose-600 text-white bg-rose-600"
          disabled={deleting}
          small
        />
      )}
    </div>
  );
};

export default AddressForm;
