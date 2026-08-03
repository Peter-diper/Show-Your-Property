const apiDomain = process.env.NEXT_PUBLIC_DOMAIN_API || null;

//* fetch all properties
async function fetchProperties() {
  try {
    // if we did not have currect apiDomain dont crash the project!
    if (!apiDomain) return [];

    const res = await fetch(`${apiDomain}/properties`, {
      cache: "force-cache",
    });
    if (!res.ok) {
      throw new Error("could not fetch propeties!");
    }
    return await res.json();
  } catch (error) {
    console.log(error);
    return [];
  }
}

//* fetch single Property
async function fetchProperty(id) {
  try {
    // if we did not have currect apiDomain dont crash the project!
    if (!apiDomain) return null;

    const res = await fetch(`${apiDomain}/properties/${id}`, {
      cache: "default",
    });
    if (!res.ok) {
      throw new Error("could not fetch propeties!");
    }
    return await res.json();
  } catch (error) {
    console.log(error);
    return null;
  }
}

//* exports
export { fetchProperties, fetchProperty };
