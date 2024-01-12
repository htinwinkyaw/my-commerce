import { NextResponse } from "next/server";
import bannerServices from "@/server/services/bannerServices";
import { checkUnauthorizedAdmin } from "@/app/_utils/checkUnauthorizedAdmin";
import { handleErrorResponse } from "@/app/_utils/handleErrorResponse";
import { handleSuccessResponse } from "@/app/_utils/handleSuccessResponse";

/**
 * Updating banner by bannerId
 * @param request Request data for updating banner.
 * @param params Parametes including bannerId for updating
 * @returns NextResponse JSON response
 */
export const PUT = async (
  request: Request,
  params: { params: { bannerId: string } }
) => {
  const bannerId = params.params.bannerId;

  try {
    const unauthorizedResponse = await checkUnauthorizedAdmin();

    if (unauthorizedResponse) return unauthorizedResponse;

    const body = await request.json();
    const { image, link, active } = body;

    const updatedBanner = await bannerServices.updateBanner(bannerId, {
      image,
      link,
      active,
    });

    return handleSuccessResponse(204, "Banner is updated.", updatedBanner);
  } catch (error) {
    console.error("Error updating banner: ", error);

    return handleErrorResponse(500, "Failed to update banner.");
  }
};

/**
 * Updating banner active status by bannerId.
 * @param request Request for updating banner status
 * @param params Parameters including bannerId for updating banner status
 * @returns NextResponse JSON response.
 */
export const PATCH = async (
  request: Request,
  params: { params: { bannerId: string } }
) => {
  const bannerId = params.params.bannerId;

  try {
    const unauthorizedResponse = await checkUnauthorizedAdmin();

    if (unauthorizedResponse) return unauthorizedResponse;

    const body = await request.json();
    const { active } = body;

    const banner = await bannerServices.updateBanner(bannerId, {
      active: !active,
    });

    return handleSuccessResponse(
      202,
      "BANNER ACTIVE STATUS is changed.",
      banner
    );
  } catch (error) {
    console.error("Error updating BANNER ACIVE STATUS: ", error);

    return handleErrorResponse(500, "Failed to update BANNER ACTIVE STATUS.");
  }
};

/**
 * DELETE a banner by ID
 * @param request Request data for deleting banner.
 * @param params Parameters including bannerId to be deleted.
 * @returns NextResponse JSON response.
 */
export const DELETE = async (
  request: Request,
  params: { params: { bannerId: string } }
) => {
  const bannerId = params.params.bannerId;

  try {
    const unauthorizedResponse = await checkUnauthorizedAdmin();

    if (!unauthorizedResponse) return unauthorizedResponse;

    const deletedBanner = await bannerServices.deleteBanner(bannerId);

    return handleSuccessResponse(204, "Banner is deleted.", deletedBanner);
  } catch (error) {
    console.error("Error deleting banner: ", error);

    return handleErrorResponse(500, "Failed to delete banner.");
  }
};
