export interface JSONdata {
    photos: Photo[]
}

export interface Photo {
    _id:         string,
    title:      string,
    caption:    string,
    source:     string,
    comments:   Comment[]
}

export interface Comment {
    photoId:    string,
    author:     string,
    comment:    string
}

export interface JumpProps {
    visible: boolean,
    photos: Photo[],
    index: number,
    setIndex: Function
}

export interface ContentProps {
    photo: Photo
}

export interface CommentProps {
    visible: boolean,
    setShowAddComment: Function,
    currentPhotoId: string,
    reloadFunction: Function,
    setLoading: Function
}