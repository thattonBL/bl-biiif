import { Directory } from "./Directory";
import { fileExists, log } from "./Utils";

export const build = async (
  dir: string,
  url: string,
  imageServiceUrl?: string,
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
    virtualName
  );

  await directory.read();

  log(`finished biiifing ${dir}`);
};

/*build(
  "C://Users/thoma/Documents/Git-Source/bl-biiif-template-net2-test/collection",
  "http://localhost:86/biiif/collection/",
  "http://tomsbigglygoodImageServer/"
);*/
