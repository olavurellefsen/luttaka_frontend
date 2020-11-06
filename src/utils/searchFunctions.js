const searchArchives = (archive, input) => {
  const reg = /[\\*?$+()[\]]+/

  if (reg.test(input))
    return null

  return (
    archive.title?.toLowerCase().match(input.toLowerCase()) ||
    archive.content?.toLowerCase().match(input.toLowerCase()) ||
    archive.date?.toLowerCase().match(input.toLowerCase()) ||
    archive.Date?.toLowerCase().match(input.toLowerCase()) ||
    archive.lecturer?.name?.toLowerCase().match(input.toLowerCase()) ||
    archive.lecturer?.organisation?.toLowerCase().match(input.toLowerCase())
  )
}

export { searchArchives }
