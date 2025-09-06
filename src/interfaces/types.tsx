// 1. 메모 객체의 타입을 정의합니다.
export interface Note {
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

export interface NoteProps {
  key: string;
  note: Note;
}

export interface NewNote {
  newTitle: string;
  newContent: string;
  newColor: string;
  newPriority: string;
  // newTag: string;
}

export interface NotesProps {
  text: string;
  isPinnedCheck: boolean;
}

// 모달 컴포넌트의 props 타입을 정의합니다.
export interface ModalProps {
  onClose: () => void;
}

// Note 전체 수정에서 id로 초기값 불러올 때
export interface ModalIdProps {
  noteId: string;
  onClose: () => void;
}

export interface Tags {
  tag: string;
}
