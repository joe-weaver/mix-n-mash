export default class Mixtape {
  constructor(data) {
    this._id = data._id;
    this.title = data.title;
    this.description = data.description;
    this.genres = data.genres;
    this.image = data.image;
    this.songs = data.songs;
    this.ownerId = data.ownerId;
    this.owner = data.owner;
    this.listens = data.listens;
    this.likes = data.likes;
    this.dislikes = data.dislikes;
    this.comments = data.comments;
    this.private = data.private;
    this.collaborato = data.collaborators;
    this.timeCreated = data.timeCreated;
    this.likesPerDay = data.likesPerDay;
  }
}
