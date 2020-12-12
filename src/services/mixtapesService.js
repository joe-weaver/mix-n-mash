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
    dislikes,
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
query getHottestMixtapesQuery($userId: String!, $criteria: String!, $skip: Int!, $limit: Int!, $following: [String]!){
  hottestMixtapes(userId: $userId, criteria: $criteria, skip: $skip, limit: $limit, following: $following){
    _id,
    title,
    description,
    genres,
    image,
    songs{
      youtubeId
    },
    ownerId,
    ownerName,
    listens,
    likes,
    listens,
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

export const getAllUserMixtapes = gql`
  query AllUserMixtapes($userId: String!){
    getAllUserMixtapes(userId: $userId){
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

export const getUserPageMixtapes = gql`
  query UserPageMixtapes($userId: String!, $otherUserId: String!){
    getUserPageMixtapes(userId: $userId, otherUserId: $otherUserId){
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
query qMixtapes($searchTerm: String!, $userId: String!, $skip: Int!, $limit: Int!){
  queryMixtapes(searchTerm: $searchTerm, userId: $userId, skip: $skip, limit: $limit){
    _id,
    title,
    description,
    genres,
    image,
    ownerId,
    ownerName,
    listens,
    likes,
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
  $ownerActive: Boolean!
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
      ownerActive: $ownerActive
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

export const removeMixtape = gql`
mutation removeMixtape($id: String!){
  removeMixtape(id: $id){
    _id
  }
}`

export const updateLikes = gql`
mutation updateLikes($id: String!, $userId: String!, $incAmount: Int!){
  updateLikes(id: $id, userId: $userId, incAmount: $incAmount){
    _id,
    likes,
    dislikes
  }
}`

export const updateDislikes = gql`
mutation updateDislikes($id: String!, $incAmount: Int!){
  updateDislikes(id: $id, incAmount: $incAmount){
    _id,
    dislikes,
    likes
  }
}`

export const addListen = gql`
mutation addListen($id: String!, $userId: String!){
  addListen(id: $id, userId: $userId){
    _id,
    listens
  }
}`

export const updateMixtapeTitle = gql`
mutation updateMixtapeTitle($id: String!, $title: String!){
  updateMixtapeTitle(id: $id, title: $title){
    _id,
    title,
  }
}`

export const updateMixtapeDescription = gql`
mutation updateMixtapeDescription($id: String!, $description: String!){
  updateMixtapeDescription(id: $id, description: $description){
    _id,
    description,
  }
}`

export const updateMixtapeGenres = gql`
mutation updateMixtapeGenres($id: String!, $genres: [String]!){
  updateMixtapeGenres(id: $id, genres: $genres){
    _id,
    genres,
  }
}`

export const updateMixtapePrivate = gql`
mutation updateMixtapePrivate($id: String!, $private: Boolean!){
  updatePrivate(id: $id, private: $private){
    _id,
    private
  }
}
`

export const updateOwnerActive = gql`
mutation updateOwnerActiveStatus($id: String!, $ownerActive: Boolean!){
  updateOwnerActive(id: $id, ownerActive: $ownerActive){
    _id,
    ownerActive
  }
}
`

export const updateCollaborators = gql`
mutation updateCollaboratorsOnMixtape($id: String!, $collaborators: [collaboratorsInput]!){
  updateCollaborators(id: $id, collaborators: $collaborators){
    _id,
    collaborators{
      userId,
      username,
      privilegeLevel
    }
  }
}
`