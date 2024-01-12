import { Banner } from "@prisma/client";
import { Database } from "firebase/database";
import prisma from "@/app/_lib/prismadb";

/**
 * Fetch all banners from the database
 * @returns Promise resolving to an array of Banner objects.
 */
const getBanners = async (): Promise<Banner[]> => {
  try {
    const banners = await prisma.banner.findMany();

    return banners;
  } catch (error) {
    throw new Error("Failed to fetch BANNERS.");
  }
};

/**
 * Fetching only active banners from the database.
 * @returns Promise resolving to an array of active Banner objects
 */
const getActiveBanners = async (): Promise<Banner[]> => {
  try {
    const banners = await prisma.banner.findMany({ where: { active: true } });

    return banners;
  } catch (error) {
    throw new Error("Failed to fetch ACTIVE BANNERS.");
  }
};

/**
 * Create a new banner in the database.
 * @params data - banner data for creation
 * @returns Promise resolving to the newly created Banner object
 */
const createBanner: (data: {
  image: string;
  link?: string;
}) => Promise<Banner> = async (data) => {
  const banner = await prisma.banner.create({
    data: { image: data.image, link: data.link },
  });

  return banner;
};

/**
 * Update an existing banner in the database.
 * @param id Banner ID for updating
 * @param data Banner data for updating
 * @returns Promise resolving to be updated Banner object
 */
const updateBanner = async (
  id: string,
  data: {
    image?: string;
    link?: string;
    active?: boolean;
  }
): Promise<Banner> => {
  const existingBanner = await prisma.banner.findFirst({ where: { id } });

  if (!existingBanner) throw new Error(`No banner is found with id "${id}".`);

  const updatedBanner = await prisma.banner.update({
    where: { id },
    data: { ...data },
  });

  return updatedBanner;
};

/**
 * Delete an existing banner from the database.
 * @param id Banner ID to be deleted.
 * @returns Promise resolving the deleted Banner object
 */
const deleteBanner = async (id: string): Promise<Banner> => {
  const existingBanner = await prisma.banner.findFirst({ where: { id } });

  if (!existingBanner) throw new Error(`No banner is found with id "${id}".`);

  const deletedBanner = await prisma.banner.delete({ where: { id } });

  return deletedBanner;
};

const bannerServices = {
  getBanners,
  getActiveBanners,
  createBanner,
  updateBanner,
  deleteBanner,
};

export default bannerServices;
