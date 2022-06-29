# nestjs-graphql-tolkien
Nestjs GraphQL

![Screenshot-Fellowship-of-the-Ring](https://user-images.githubusercontent.com/13861835/176483813-f8ba7c96-36d5-4bc7-b1f8-cbcd05d2ca8a.jpg)

https://user-images.githubusercontent.com/13861835/176484330-272d56d7-b0f7-4f00-9d37-089aa1d8a18d.mp4



```
{
  cultures(
    options: {
      take: 100
      skip: 0
      sort: { name: ASC }
      filter: { name: { search: "Fellowship" } }
    }
  ) {
    totalItems
    items {
      id
      name
      characters(
        options: {
          take: 10
          skip: 0
          sort: { name: ASC }
          filter: { name: { search: "Gandalf" } }
        }
      ){
        totalItems
        items{
          id
          name
        }
      }
    }
  }
}

```
