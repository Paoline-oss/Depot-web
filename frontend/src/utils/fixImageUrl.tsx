export function fixImageUrl(url: string){
  return url.replace(
    "https://cdn.rawgit.com/akabab/superhero-api/0.2.0/api/images",
    "https://akabab.github.io/superhero-api/api/images"
  )
}