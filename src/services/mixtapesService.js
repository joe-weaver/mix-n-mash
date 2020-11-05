import { gql, ApolloClient, InMemoryCache } from '@apollo/client';

export const mixtapesClient = new ApolloClient({
    uri: "http://localhost:3000/Mixtapes",
    cache: new InMemoryCache()
})

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


