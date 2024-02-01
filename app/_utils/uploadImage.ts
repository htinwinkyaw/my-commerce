import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "@firebase/storage";

import { FieldValues } from "react-hook-form";
import firebaseApp from "../_lib/firebaseApp";
import toast from "react-hot-toast";

export const uploadImage = (
  data: FieldValues,
  storageUrl: string
): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (
      !data.image ||
      !data.image[0] ||
      !data.image[0].type.startsWith("image/")
    ) {
      toast.error("Please upload a valid image file.");
      reject(new Error("Image type error."));
      return;
    }

    const filename = new Date().getTime() + "-" + data.image[0].name;
    const metadata = { contentType: data.image[0].type };

    const storage = getStorage(
      firebaseApp,
      "gs://my-commerce-409407.appspot.com"
    );
    const storageRef = ref(storage, `${storageUrl}/${filename}`);

    const uploadTask = uploadBytesResumable(
      storageRef,
      data.image[0],
      metadata
    );

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Handle upload progress if needed
      },
      (error) => {
        console.error("Error uploading image: ", error);
        reject(error);
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          console.log(downloadURL);
          resolve(downloadURL);
        } catch (error) {
          console.error("Error getting download URL: ", error);
          reject(error);
        }
      }
    );
  });
};
