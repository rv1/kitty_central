kitties = Kitty.create(
  [
    {
      name: "Sparta",
      image_url: "http://placekitten.com/400/300"
    },
    {
      name: "Blizzard",
      image_url: "http://placekitten.com/400/300"
    },
    {
      name: "Puffin",
      image_url: "http://placekitten.com/400/300"
    },
    {
      name: "Mousse",
      image_url: "http://placekitten.com/400/300"
    },
    {
      name: "Stripes",
      image_url: "http://placekitten.com/400/300"
    },
    {
      name: "Moon Cat",
      image_url: "http://placekitten.com/400/300"
    },
    {
      name: "Blanco",
      image_url: "http://placekitten.com/400/300"
    },
    {
      name: "Tic Tac",
      image_url: "http://placekitten.com/400/300"
    }
  ]
)

reviews = Review.create(
  [
    {
      title: "Good Kitty",
      description: "cute eyes, tiny little paws",
      score: 5,
      kitty: kitties.first
    },
    {
      title: "Weird Dog",
      description: "I was told this is a dog.",
      score: 1,
      kitty: kitties.first
    }
  ]
)
