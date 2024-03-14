export interface Blog {
  id: string;
  collectionId: string;
  collectionName: string;
  created: string;
  updated: string;
  title: string;
  content: string;
  coverPhoto: string;
  tag: string;
  userId: string;
  files: string[];
  veiws: number;
  creatorName: string;
  creatorUsername: string;
  avatar: string;
  category: string;
  likes: string[];
  comments: string[];
  bookmarks: string[];
}

export interface Comments {
  id: string;
  collectionId: string;
  collectionName: string;
  created: string;
  updated: string;
  comment: string;
  blogId: string;
  creatorName: string;
  creatorUsername: string;
  avatar: string;
  likes?: string[];
  userId: string;
}
