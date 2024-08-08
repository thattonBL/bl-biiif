import { Directory } from "./Directory";
import { fileExists, log } from "./Utils";

export const build = async (
  dir: string,
  url: string,
  imageServiceUrl?: string,
  sequenceList?: string,
  virtualName?: string
): Promise<void> => {
  log(`started biiifing ${dir}`);

  // validate inputs

  const exists: boolean = await fileExists(dir);

  if (!exists) {
    throw new Error("Directory does not exist");
  }

  if (!url) {
    // if a url hasn't been passed, check if running on Netlify or Vercel and use the appropriate url
    if (process.env.NETLIFY) {
      url =
        process.env.PULL_REQUEST === "true"
          ? process.env.DEPLOY_PRIME_URL
          : process.env.URL;
    } else if (process.env.VERCEL) {
      url = `https://${process.env.VERCEL_URL}`;
    } else {
      throw new Error("You must pass a url parameter");
    }
  }

  if (!imageServiceUrl) {
    throw new Error("You must pass an image service url parameter");
  }

  const directory: Directory = new Directory(
    dir,
    url,
    imageServiceUrl,
    sequenceList,
    virtualName
  );

  await directory.read();

  log(`finished biiifing ${dir}`);
};

/*
build(
  "C://Users/thoma/Documents/BLWork/Digital-Manuscripts/testManuscript",
  "http://localhost:8182/biiif/collection/",
  "http://localhost:8182/iiif/2/",
  "_cotton_ms_nero_d_iv_fblefr¬_cotton_ms_nero_d_iv_fblefv¬_cotton_ms_nero_d_iv_fs001r"
);
*/
