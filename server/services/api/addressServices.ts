import { Address } from "@prisma/client";
import prisma from "@/app/_lib/prismadb";
import userServices from "./userServices";

/**
 * Create a new address for the user.
 * @param data Address data for creating a new address
 * @returns Promise resolving the newly created address.
 */
const createdAddress = async (data: {
  receiverName: string;
  phone: string;
  line: string;
  state: string;
  township: string;
  postalCode: string;
  deliveryNote?: string;
}): Promise<Address> => {
  try {
    // Change the existing addresses to UNSELECTED ADDRESS (NOT DEFAULT)
    const userId = await userServices.getCurrentUserId();

    const addresses = await prisma.address.findMany({
      where: { userId },
    });

    if (addresses.length >= 1) {
      await Promise.all(
        addresses.map(async (address) => {
          const updatedAddress = await prisma.address.update({
            where: { id: address.id },
            data: { isSelectedAddress: false },
          });

          return updatedAddress;
        })
      );
    }

    // Add new address to the database
    const address = await prisma.address.create({
      data: {
        userId: userId,
        receiverName: data.receiverName,
        line: data.line,
        township: data.township,
        state: data.state,
        postalCode: data.postalCode,
        phone: data.phone,
        deliveryNote: data.deliveryNote,
        isSelectedAddress: true,
      },
    });

    return address;
  } catch (error) {
    console.error("Error creating address: ", error);

    throw new Error("Failed to create new address. (Internal Server Error)");
  }
};

/**
 * Fetching the addresses by the userId.
 * @returns Promise resolving the array of addresses.
 */
const getAddressesByUserId = async (): Promise<Address[]> => {
  try {
    const userId = await userServices.getCurrentUserId();

    const addresses = await prisma.address.findMany({ where: { userId } });

    return addresses;
  } catch (error) {
    console.error(error);

    throw new Error(
      "Failed to fetch ADDRESSES BY USER ID. (Internal Server Error)"
    );
  }
};

/**
 * Fetch address with addressId from the database.
 * @param addressId
 * @returns Promise resolving address fetched by addressId
 */
const getAddressByAddressId = async (addressId: string): Promise<Address> => {
  try {
    const userId = await userServices.getCurrentUserId();

    const address = await prisma.address.findFirst({
      where: { userId, id: addressId },
    });

    if (!address) {
      throw new Error(`No address with ${addressId} id.`);
    }

    return address;
  } catch (error) {
    console.error("Error fetching ADDRESS BY ADDRESS ID: ", error);

    throw new Error("Failed to fetch ADDRESS BY ADDRESS ID.");
  }
};

/**
 * Update address
 * @param addressId Address ID for choosing the address to update
 * @param data
 * @returns Promise resolving updated adddress
 */
const updateAddress = async (addressId: string, data: any) => {
  try {
    const userId = await userServices.getCurrentUserId();

    const address = await prisma.address.update({
      where: { id: addressId, userId },
      data: {
        receiverName: data.receiverName,
        phone: data.phone,
        line: data.line,
        state: data.state,
        township: data.township,
        postalCode: data.postalCode,
        deliveryNote: data.deliveryNote,
      },
    });

    return address;
  } catch (error) {
    console.error(error);

    throw new Error("Failed to update address. (Internal Server Error)");
  }
};

/**
 * Updating the default address
 * @returns Promise resolving default updated address
 */
const updateDefaultAddress = async (addressId: string) => {
  try {
    const userId = await userServices.getCurrentUserId();

    const existingAddress = await prisma.address.findFirst({
      where: { userId, id: addressId },
    });

    if (!existingAddress) {
      throw new Error(`No address is found with ${addressId} id.`);
    }

    // change all addresses with the userId to isSelectedAddress as false
    await prisma.address.updateMany({
      where: { userId },
      data: { isSelectedAddress: false },
    });

    const updatedAddress = await prisma.address.update({
      where: { userId, id: addressId },
      data: { isSelectedAddress: true },
    });

    return updatedAddress;
  } catch (error) {
    console.error("Error updating default address: ", error);

    throw new Error("Failed to update default address.");
  }
};

/**
 * Deleting address from the database.
 * @param addressId Address ID for choosing the address to delete
 * @returns Promise resolving deleted address
 */
const deleteAddress = async (addressId: string): Promise<Address> => {
  try {
    const userId = await userServices.getCurrentUserId();

    const existingAddress = await prisma.address.findFirst({
      where: { id: addressId, userId },
    });

    if (!existingAddress) throw new Error(`No address with ${addressId} id.`);

    if (existingAddress.isSelectedAddress === true) {
      throw new Error("Cannot delete default address.");
    }

    const deletedAddress = await prisma.address.delete({
      where: { id: addressId },
    });

    return deletedAddress;
  } catch (error) {
    console.error("Error deleting address: ", error);

    throw new Error("Failed to delete address. (Internal Server Error)");
  }
};

const addressServices = {
  createdAddress,
  getAddressesByUserId,
  getAddressByAddressId,
  updateAddress,
  updateDefaultAddress,
  deleteAddress,
};

export default addressServices;
