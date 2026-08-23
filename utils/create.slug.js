 const createSlug = (name) => {
  const random = Math.random().toString(36).substring(2, 6);

  return `${name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")}-${random}`;
};

export default createSlug;