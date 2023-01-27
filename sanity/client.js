import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url"

export const client = createClient({
    projectId: "18td31w2",
    dataset: "production",
    apiVersion: "2022-12-22",
    useCdn: false,
    token: "skFLpSc6wujWCsXIj56tBx9NhGgT0XlDGwZOsWgQdB8jeVXEBqlPwovB0uRLDuhAK5KUIjYdL40NBps4Xh70OMxvSbpMpuUEEfEpsR4tFiTs1yjLn00osJM6bfu3NB2kFu1aT09LtI7zez6hWHeVlmGrT8y5ZYUvfvcKhTsncVVXOf3A4frm"
})

const builder = imageUrlBuilder(client)

export const urlFor = (source) => {
    return builder.image(source)
}