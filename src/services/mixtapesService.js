import { gql, ApolloClient, InMemoryCache } from '@apollo/client';

export const mixtapesClient = new ApolloClient({
    uri: "http://localhost:3000/Mixtapes",
    cache: new InMemoryCache()
});

export const getMixtape = gql`
query getMixtape($id: String!){
  mixtape(id: $id){
    _id,
    title,
    description,
    genres,
    image,
    songs {
      name
      youtubeId
    },
    ownerId,
    ownerName,
    private,
    listens,
    likes,
    likesPerDay,
    listensPerDay
  }
}
`

export const getHottestMixtapes = gql`
{
    hottestMixtapes{
    	_id,
      title,
      description,
      genres,
      image,
      songs {
        name
        youtubeId
      },
      ownerId,
      ownerName,
      private,
      listens,
      likes,
      likesPerDay,
      listensPerDay
  }
}`

export const getUserMixtapes = gql`
  query Mixtapes($userId: String!){
    getUserMixtapes(userId: $userId){
      _id,
      title,
      description,
      genres,
      image,
      songs {
        name
        youtubeId
      },
      ownerId,
      ownerName,
      private,
      listens,
      likes,
      likesPerDay,
      listensPerDay,
      collaborators {
        userId,
        username,
        privilegeLevel
      }
    }
  }
`

export const queryMixtapes = gql`
query qMixtapes($searchTerm: String!){
  queryMixtapes(searchTerm: $searchTerm){
    _id,
    title,
    description,
    genres,
    image,
    songs {
      name
      youtubeId
    },
    ownerId,
    ownerName,
    private,
    listens,
    likes,
    likesPerDay,
    listensPerDay,
    collaborators {
      userId,
      username,
      privilegeLevel
    }
  }
}`

export const addMixtape = gql`
mutation AddMixtape(
  $title: String!
  $description: String!
  $genres: [String]!
  $image: [String]!
  $songs: [songInput]!
  $ownerId: String!
  $ownerName: String!
  $listens: Int!
  $likes: Int!
  $dislikes: Int!
  $comments: [commentInput]!
  $private: Boolean!
  $collaborators: [collaboratorsInput]!
  $timeCreated: Int!
  $likesPerDay: [Int]!
  $listensPerDay: [Int]!
  ){
    addMixtape(
      title: $title
      description: $description
      genres: $genres
      image: $image
      songs: $songs
      ownerId: $ownerId
      ownerName: $ownerName
      listens: $listens
      likes: $likes
      dislikes: $dislikes
      comments: $comments
      private: $private
      collaborators: $collaborators
      timeCreated: $timeCreated
      likesPerDay: $likesPerDay
      listensPerDay: $listensPerDay
    ){
      _id
      title
    }
  }
`;

export const addSongs = gql`
mutation addSongs($id: String!, $songs: [songInput]!){
  addSongs(id: $id, songs: $songs){
    _id
    songs{
      youtubeId,
      name
    }
  }
}
`
