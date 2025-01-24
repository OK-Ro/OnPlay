const useMovies = [
  {
    title: "Kandahar",
    year: 2023,
    cast: [
      "Gerard Butler",
      "Ali Fazal",
      "Olivia-Mai Barrett",
      "Navid Negahban",
      "Nina Toussaint-White",
      "Travis Fimmel",
    ],
    genres: ["Action", "Thriller"],
    href: "Kandahar_(2023_film)",
    extract:
      "Kandahar is an upcoming American action thriller film directed by Ric Roman Waugh, written by Mitchell LaFortune, and produced by Gerard Butler, who also stars in the film alongside Ali Fazal. The film is scheduled to be released in theaters on May 26, 2023, by Open Road Films.",
    thumbnail:
      " https://dx35vtwkllhj9.cloudfront.net/open-road/kandahar/images/gallery/image2.jpg",
  },
  {
    title: "The Machine",
    year: 2023,
    cast: [
      "Bert Kreischer",
      "Mark Hamill",
      "Jimmy Tatro",
      "Iva Babić",
      "Stephanie Kurtzuba",
    ],
    genres: ["Action", "Comedy"],
    href: "The_Machine_(2023_film)",
    extract:
      "The Machine is an upcoming American action comedy film directed by Peter Atencio inspired by the 2016 stand-up routine of the same name created by Bert Kreischer, who also stars as a fictionalized version of himself. The film also stars Mark Hamill, Jess Gabor, Jimmy Tatro, Stephanie Kurtzuba and Mercedes De La Cruz.",
    thumbnail:
      "https://i.guim.co.uk/img/media/3d9c695d40fd761b5c59b16c4641a170d87be193/0_219_6048_3627/master/6048.jpg?width=700&quality=85&auto=format&fit=max&s=211ac0ad55b69a55c9f8360d5c6953c7",
  },
  {
    title: "You Hurt My Feelings",
    year: 2023,
    cast: [
      "Julia Louis-Dreyfus",
      "Tobias Menzies",
      "Michaela Watkins",
      "Arian Moayed",
      "Owen Teague",
      "Amber Tamblyn",
      "David Cross",
      "Jeannie Berlin",
    ],
    genres: ["Comedy", "Drama"],
    href: "You_Hurt_My_Feelings_(2023_film)",
    extract:
      "You Hurt My Feelings is a 2023 American comedy-drama film written, directed and produced by Nicole Holofcener. It stars Julia Louis-Dreyfus, Tobias Menzies, Michaela Watkins, Arian Moayed and Jeannie Berlin.",
    thumbnail:
      "https://m.media-amazon.com/images/M/MV5BNThmNTVjMTYtN2M2NS00NjVhLWJjNjEtZTdjNzI3Y2NjZDVmXkEyXkFqcGdeQXVyMTMxMTIwMTE0._V1_.jpg",
  },
  {
    title: "Spider-Man: Across the Spider-Verse",
    year: 2023,
    cast: [
      "Shameik Moore",
      "Hailee Steinfeld",
      "Jake Johnson",
      "Issa Rae",
      "Daniel Kaluuya",
      "Karan Soni",
      "Jason Schwartzman",
      "Brian Tyree Henry",
      "Luna Lauren Vélez",
      "Greta Lee",
      "Rachel Dratch",
      "Jorma Taccone",
      "Shea Whigham",
      "Oscar Isaac",
    ],
    genres: ["Animated", "Superhero"],
    href: "Spider-Man:_Across_the_Spider-Verse",
    extract:
      'Spider-Man: Across the Spider-Verse is an upcoming American computer-animated superhero film featuring the Marvel Comics character Miles Morales / Spider-Man. It is produced by Columbia Pictures and Sony Pictures Animation in association with Marvel Entertainment, and distributed by Sony Pictures Releasing. It is the sequel to Spider-Man: Into the Spider-Verse (2018) and is set in a shared multiverse of alternate universes called the "Spider-Verse". The film is directed by Joaquim Dos Santos, Kemp Powers, and Justin K. Thompson, from a screenplay written by Phil Lord, Christopher Miller, and David Callaham. Shameik Moore voices Miles, starring alongside Hailee Steinfeld, Jake Johnson, Issa Rae, Daniel Kaluuya, Karan Soni, Jason Schwartzman, Brian Tyree Henry, Luna Lauren Vélez, Greta Lee, Rachel Dratch, Jorma Taccone, Shea Whigham and Oscar Isaac. In the film, Miles goes on an adventure with Gwen Stacy / Spider-Woman across the multiverse where he meets a new team of Spider-People, known as the Spider-Society, but comes into conflict with them over handling a new threat.',
    thumbnail:
      "https://pyxis.nymag.com/v1/imgs/fe6/36f/1b2baff1410d7edb80e04e3e57e96e3c4c-spider-verse.jpg",
  },
  {
    title: "The Boogeyman",
    year: 2023,
    cast: [
      "Sophie Thatcher",
      "Chris Messina",
      "Vivien Lyra Blair",
      "Marin Ireland",
      "Madison Hu",
      "LisaGay Hamilton",
      "David Dastmalchian",
    ],
    genres: ["Horror", "Supernatural"],
    href: "The_Boogeyman_(2023_film)",
    extract:
      "The Boogeyman is an upcoming American supernatural horror film directed by Rob Savage from a screenplay by Scott Beck, Bryan Woods and Mark Heyman, based on the 1973 short story of the same name by Stephen King. The film stars Madison Hu, Vivien Lyra Blair, Sophie Thatcher, David Dastmalchian, Chris Messina, and Jaynie Verdin.",
    thumbnail:
      "https://www.heavenofhorror.com/wp-content/uploads/2023/01/the-boogeyman-2023-horror.jpg",
  },
  {
    title: "Past Lives",
    year: 2023,
    cast: ["Greta Lee", "Teo Yoo", "John Magaro"],
    genres: ["Drama", "Romance"],
    href: "Past_Lives_(film)",
    extract:
      "Past Lives is a 2023 American romantic drama film written and directed by Celine Song in her feature directorial debut. The film stars Greta Lee, Teo Yoo and John Magaro, and follows a reunion between two childhood friends as they contemplate their relationship and their own lives.",
    thumbnail:
      "https://static01.nyt.com/images/2023/06/01/multimedia/01past-lives2-bcmh/01past-lives2-bcmh-videoSixteenByNine3000.jpg",
  },
  {
    title: "Transformers: Rise of the Beasts",
    year: 2023,
    cast: [
      "Anthony Ramos",
      "Dominique Fishback",
      "Peter Cullen",
      "Ron Perlman",
      "Pete Davidson",
      "Liza Koshy",
      "Peter Dinklage",
      "Michelle Yeoh",
    ],
    genres: ["Action", "Science Fiction"],
    href: "Transformers:_Rise_of_the_Beasts",
    extract:
      "Transformers: Rise of the Beasts is an upcoming American science fiction action film based on Hasbro's Transformers toy line and primarily influenced by the Beast Wars storyline. The film is the seventh installment in the Transformers film series and a standalone sequel to Bumblebee (2018). The film is directed by Steven Caple Jr. from a screenplay by Joby Harold, Darnell Metayer, Josh Peters, Erich Hoeber, and Jon Hoeber. It will star Anthony Ramos, Dominique Fishback, Luna Lauren Vélez and Tobe Nwigwe in his film debut, as well the voice talents of Ron Perlman, Peter Dinklage, Michelle Yeoh, Pete Davidson, Liza Koshy, Cristo Fernández, Michaela Jaé Rodriguez, Tongayi Chirisa, and previous voice actors, Peter Cullen, John DiMaggio and David Sobolov.",
    thumbnail:
      "https://images.thedirect.com/media/article_full/transformers-beasts.jpg",
  },
  {
    title: "Strays",
    year: 2023,
    cast: [
      "Will Ferrell",
      "Jamie Foxx",
      "Will Forte",
      "Isla Fisher",
      "Randall Park",
      "Josh Gad",
      "Harvey Guillén",
      "Rob Riggle",
      "Brett Gelman",
      "Jamie Demetriou",
      "Sofia Vergara",
    ],
    genres: ["Comedy"],
    href: "Strays_(2023_film)",
    extract:
      "Strays is an upcoming American comedy film directed and produced by Josh Greenbaum. The film stars Will Ferrell, Jamie Foxx, Will Forte, Isla Fisher, Randall Park, Josh Gad, Harvey Guillén, Rob Riggle, Brett Gelman, Jamie Demetriou, and Sofia Vergara.",
    thumbnail:
      "https://ca-times.brightspotcdn.com/dims4/default/a97e03b/2147483647/strip/false/crop/5472x3583+0+0/resize/1486x973!/quality/75/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2Fe3%2Fea%2F9015ca904b84acd2b281c531dea4%2Fstrays-1.jpg",
  },

  {
    title: "The Flash",
    year: 2023,
    cast: [
      "Ezra Miller",
      "Sasha Calle",
      "Michael Shannon",
      "Ron Livingston",
      "Maribel Verdú",
      "Kiersey Clemons",
      "Antje Traue",
      "Michael Keaton",
      "Ben Affleck",
    ],
    genres: ["Superhero"],
    href: "The_Flash_(film)",
    extract:
      "The Flash is an upcoming American superhero film based on the DC Comics character of the same name. Produced by DC Studios, Double Dream, and the Disco Factory, and set for distribution by Warner Bros. Pictures, it is intended to be the 13th installment in the DC Extended Universe (DCEU). The film is directed by Andy Muschietti from a screenplay by Christina Hodson and stars Ezra Miller as Barry Allen / The Flash alongside Sasha Calle, Michael Shannon, Ron Livingston, Maribel Verdú, Kiersey Clemons, Antje Traue, and Michael Keaton. In the film, Barry travels back in time to prevent his mother's murder, which brings unintended consequences.",
    thumbnail:
      "https://emorywheel.com/wp-content/uploads/2016/10/ac1fafb4cef5bb6bf83b03a08c3d20d3.jpg",
  },
  {
    title: "Elemental",
    year: 2023,
    cast: [
      "Leah Lewis",
      "Mamoudou Athie",
      "Ronnie del Carmen",
      "Shila Omni",
      "Wendi McLendon-Covey",
      "Mason Wertheimer",
      "Catherine O'Hara",
      "Joe Pera",
      "Matt Yang King",
    ],
    genres: ["Animated", "Comedy", "Drama", "Romance"],
    href: "Elemental_(2023_film)",
    extract:
      "Elemental is an upcoming American computer-animated romantic comedy-drama film produced by Walt Disney Pictures and Pixar Animation Studios and distributed by Walt Disney Studios Motion Pictures. Directed by Peter Sohn and produced by Denise Ream, it is written by John Hoberg, Kat Likkel, Brenda Hsueh, and Sohn. The overall twenty-seventh feature film produced by the studio, the film stars the voices of Leah Lewis, Mamoudou Athie, Ronnie del Carmen, Shila Ommi, Wendi McLendon-Covey, Catherine O'Hara, Mason Wertheimer, Joe Pera, and Matt Yang King. Set in a world inhabited by anthropomorphic elements of nature, the story depicts the bond between a fire element Ember Lumen (Lewis) and a water element Wade Ripple (Athie), who cannot touch each other but discover how much they have in common.",
    thumbnail:
      "https://cdn.s7.shopdisney.eu/is/image/ShopDisneyEMEA/43152_q323_elemental_movie_page_mb?fit=constrain&cropN=0,0,1,1&fmt=jpeg&qlt=90&wid=1200",
  },
  {
    title: "Asteroid City",
    year: 2023,
    cast: [
      "Jason Schwartzman",
      "Scarlett Johansson",
      "Tom Hanks",
      "Jeffrey Wright",
      "Tilda Swinton",
      "Bryan Cranston",
      "Edward Norton",
      "Adrien Brody",
      "Liev Schreiber",
      "Hope Davis",
      "Stephen Park",
      "Rupert Friend",
      "Maya Hawke",
      "Steve Carell",
      "Matt Dillon",
      "Hong Chau",
      "Willem Dafoe",
      "Margot Robbie",
      "Tony Revolori",
      "Jake Ryan",
      "Jeff Goldblum",
    ],
    genres: ["Comedy", "Drama", "Science Fiction", "Romance"],
    href: "Asteroid_City",
    extract:
      "Asteroid City is an upcoming American science fiction romantic comedy drama film written, directed and co-produced by Wes Anderson, based on a story by Anderson and Roman Coppola. The film follows the transformative events that occur at an annual Junior Stargazer convention in 1955. It features a large ensemble cast that includes Jason Schwartzman, Scarlett Johansson, Tom Hanks, Jeffrey Wright, Tilda Swinton, Bryan Cranston, Edward Norton, Adrien Brody, Liev Schreiber, Hope Davis, Steve Park, Rupert Friend, Maya Hawke, Steve Carell, Matt Dillon, Hong Chau, Willem Dafoe, Margot Robbie, Tony Revolori, Jake Ryan, and Jeff Goldblum.",
    thumbnail:
      "https://www.universalpictures.nl/tl_files/content/movies/asteroid_city/gallery/01.jpg",
  },
  {
    title: "Mission: Impossible – Dead Reckoning Part One",
    year: 2023,
    cast: [
      "Tom Cruise",
      "Simon Pegg",
      "Ving Rhames",
      "Rebecca Ferguson",
      "Vanessa Kirby",
      "Esai Morales",
      "Hayley Atwell",
      "Pom Klementieff",
      "Shea Whigham",
      "Henry Czerny",
      "Cary Elwes",
    ],
    genres: ["Action", "Spy"],
    href: "Mission:_Impossible_%E2%80%93_Dead_Reckoning_Part_One",
    extract:
      "Mission: Impossible – Dead Reckoning Part One is an upcoming American action spy film written, produced, and directed by Christopher McQuarrie. It is the sequel to Mission: Impossible – Fallout (2018) and is the seventh installment in the Mission: Impossible film series. The film stars Tom Cruise, Ving Rhames, Simon Pegg, Rebecca Ferguson, Vanessa Kirby, Hayley Atwell, Shea Whigham, Pom Klementieff, Esai Morales, Rob Delaney, Henry Czerny, and Cary Elwes.",
    thumbnail:
      "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/628Dep6AxEtDxjZoGP78TsOxYbK.jpg",
  },
];

export default useMovies;
