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


