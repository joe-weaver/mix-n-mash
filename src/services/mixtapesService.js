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
    listensPerDay,
    collaborators {
      userId,
      username,
      privilegeLevel
    }
    timeCreated
    comments {
      id
      userId
      username
      content
      publishingTime
      replies {
        userId
        username
        content
        publishingTime
      }
    }
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
      ownerId,
      ownerName,
      listens,
      likes,
      likesPerDay,
      listensPerDay,
      timeCreated,
    }
  }
`

export const getUserMixtapes = gql`
  query Mixtapes($userId: String!){
    getUserMixtapes(userId: $userId){
      _id,
      title,
      description,
      genres,
      image,
      ownerId,
      ownerName,
      private,
      listens,
      likes,
      timeCreated,
      collaborators {
        userId,
        username,
        privilegeLevel
      }
      songs {
        youtubeId,
        name
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
    ownerId,
    ownerName,
    listens,
    likes,
    likesPerDay,
    listensPerDay,
    timeCreated,
  }
}`

export const createMixtape = gql`
mutation createMixtape(
  $ownerId: String!
  $ownerName: String!){
  createNewMixtape(
    ownerId: $ownerId
    ownerName: $ownerName
  ){
    _id,
    title,
    description,
    genres,
    image,
    ownerId,
    ownerName,
    private,
    listens,
    likes,
    timeCreated,
    collaborators {
      userId,
      username,
      privilegeLevel
    }
  }
}
`;

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
}`

export const editSongs = gql`
mutation editSongs($id: String!, $songs: [songInput]!){
  editSongs(id: $id, songs: $songs){
    _id
    songs{
      youtubeId,
      name
    }
  }
}`

export const addComment = gql`
mutation addComment(
  $id: String!,
  $comment: commentInput!
){
  addComment(
    id: $id
    comment: $comment
    ){
    _id
    comments {
      id
      userId
      username
      content
      publishingTime
    }
  }
}`;

export const addReply = gql`
mutation addReply(
  $id: String!,
  $commentId: String!,
  $reply: replyInput!
){
  addReply(
    id: $id,
    commentId: $commentId,
    reply: $reply
    ){
    _id
    comments {
      replies {
        userId
        username
        content
        publishingTime
      }
    }
  }
}
`;

export const createMixtapeFromBase = gql`
mutation createMixtapeFromBase(
  $ownerId: String!
  $ownerName: String!
  $title: String!
  $description: String!
  $genres: [String]!
  $image: [String]!
  $songs: [songInput]!
){
  createMixtapeFromBase(
    ownerId: $ownerId
    ownerName: $ownerName
    title: $title
    description: $description
    genres: $genres
    image: $image
    songs: $songs
  ){
    _id
  }
}
`;

export const mashMixtape = gql`
mutation mashMixtape(
  $id: String!,
  $title: String!,
  $songs: [songInput]!,
  $genres: [String]!
){
  mashMixtape(id: $id, title: $title, songs: $songs, genres: $genres){
    _id,
    title,
    songs {
      youtubeId,
      name
    },
    genres
  }
}
`;