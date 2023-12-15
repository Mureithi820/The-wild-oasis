import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}
export async function createEditCabin(newCabin, id) {
  if (!newCabin || !newCabin.image) {
    throw new Error("Invalid cabin data. Image is required.");
  }

  const hasImagePath =
    newCabin.image && newCabin.image.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image.name || ""}`.replaceAll(
    "/",
    ""
  );

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  try {
    // Upload Image if it's a new image
    if (!hasImagePath) {
      const { error: storageError } = await supabase.storage
        .from("cabin-images")
        .upload(imageName, newCabin.image);

      if (storageError) {
        console.error(storageError);
        throw new Error("Cabin image could not be uploaded");
      }
    }

    // Update the cabin
    const { data: updatedCabin, error: updateError } = await supabase
      .from("cabins")
      .upsert(
        [
          {
            ...(id ? { id } : {}),
            ...newCabin,
            image: hasImagePath ? newCabin.image : imagePath,
          },
        ],
        { returning: "representation" }
      );

    // console.log("Supabase Response:", { updatedCabin, updateError });

    if (updateError) {
      console.error(updateError);
      throw new Error("Cabin could not be created/edited");
    }

    // Fetch the updated cabin data only if the id is defined
    if (id) {
      const { data: fetchedCabin, error: fetchError } = await supabase
        .from("cabins")
        .select()
        .eq("id", id)
        .single();

      if (fetchError) {
        console.error(fetchError);
        throw new Error("Error fetching updated cabin data");
      }

      return fetchedCabin;
    }

    // If id is undefined, return the updatedCabin directly
    return updatedCabin;
  } catch (error) {
    console.error(error);
    throw new Error("Cabin could not be created/edited");
  }
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }

  return data;
}
