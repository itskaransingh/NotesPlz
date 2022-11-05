import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';


 export const client=sanityClient({
    projectId:'xoqakqry',
    dataset:"production",
    apiVersion:"2022-11-04",
    useCdn:true,
    token:'skBmtDKWo2bG8GSkUCFXo4JOSp6OjHFBvWiNn81Vecbwb8fGdbsBOzh2fLaUxAZQeAreGhsowonRH0E5IifDxfpmYFIRmQlAQjPA6YmGpbgLrBQCWJL8U0MzrnuD1jeAbfDEuH9Rs86toS2rLR6rxKXr63NOreeIOltPT5oOv7dciqku0QSx',
})
const builder= imageUrlBuilder(client)
export const urlfor=(source)=>(builder.image(source))