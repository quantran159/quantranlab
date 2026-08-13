import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
export default function sitemap(): MetadataRoute.Sitemap { const base="https://quantranlab.com"; return ["","/work","/about","/contact"].map(path=>({url:base+path,lastModified:new Date()})).concat(projects.map(p=>({url:`${base}/work/${p.slug}`,lastModified:new Date()}))); }
