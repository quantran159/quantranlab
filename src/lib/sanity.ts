import { createClient } from "next-sanity";
const projectId=process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
export const sanityClient = projectId ? createClient({projectId,dataset:process.env.NEXT_PUBLIC_SANITY_DATASET || "production",apiVersion:process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-08-13",useCdn:true}) : null;
