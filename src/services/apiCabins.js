import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    throw new Error("cabin could not be loaded");
  }

  return data;
}

export async function deleteCabins(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    throw new Error("cabin could not be deleted");
  }

  return data;
}

export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  // https://jxtphphvekklkksefohd.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  let query = supabase.from("cabins");

  if (!id)
    // 1) CREATE NEW CABIN
    query = query.insert([{ ...newCabin, image: imagePath }]);

  // 2) UPDATE CABIN
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  //excute
  const { data, error } = await query.select().single();

  if (error) {
    console.log(error.message);
    throw new Error("cabins could not be created");
  }

  // 2) UPLOAD FILE STORAGE
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // 3) DELETE THE CABIN IF THERE WAS AN ERROR uploading IMAGES
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);

    console.log(storageError.message);
    throw new Error(
      "cabins image could not be upload and the cabin was not created"
    );
  }

  return data;
}
