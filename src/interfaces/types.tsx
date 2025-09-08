// 1. 메모 객체의 타입을 정의합니다.
export interface INote {
  id: string;
  title: string;
  content: string;
  color: string;
  priority: string;
  isPinned: boolean;
  tag: string;
  createDate: string;
  updateDate: string;
  isTrash: boolean;
}

export interface INoteProps {
  key: string;
  note: INote;
}

export interface INewNote {
  newTitle: string;
  newContent: string;
  newColor: string;
  newPriority: string;
  newTag: string;
}

export interface INotesProps {
  text: string;
  isPinnedCheck: boolean;
}

export interface INotesTrashProps {
  isTrashCheck: boolean;
}

// 모달 컴포넌트의 props 타입을 정의합니다.
export interface IModalProps {
  onClose: () => void;
}

export interface ITags {
  tag: string;
}
