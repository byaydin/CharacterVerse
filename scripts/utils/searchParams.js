export function getIdSearchParam() {
  const searchParams = new URLSearchParams(window.location.search);
  const id = searchParams.get("id");

  if (!id || !/^[1-9]\d*$/.test(id)) {
    throw new Error();
  }

  return Number(id);
}
