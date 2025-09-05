import type { Note } from "../interfaces/types";

// high 우선
export function sortByPriorityLtoH(notes: Note[]): Note[] {
  // 배열의 복사본을 만들어 원본 배열을 수정하지 않습니다.
  const sortedNotes = [...notes];

  sortedNotes.sort((a, b) => {
    // a가 high 우선순위이고 b가 low 우선순위일 경우 a가 먼저 오도록
    if (a.priority === "high" && b.priority === "low") {
      return -1;
    }
    // b가 high 우선순위이고 a가 low 우선순위일 경우 b가 먼저 오도록
    if (a.priority === "low" && b.priority === "high") {
      return 1;
    }
    return 0; // 우선순위가 같을 경우 순서 유지
  });

  return sortedNotes;
}

// low 우선
export function sortByPriorityHtoL(notes: Note[]): Note[] {
  const sortedNotes = [...notes];

  sortedNotes.sort((a, b) => {
    if (a.priority === "low" && b.priority === "high") {
      return -1;
    }
    if (a.priority === "high" && b.priority === "low") {
      return 1;
    }
    return 0;
  });

  return sortedNotes;
}

// 최신순
export function sortByLatestDate(notes: Note[]): Note[] {
  // 배열의 복사본을 만들어 원본 배열을 수정하지 않습니다.
  const sortedNotes = [...notes];

  sortedNotes.sort((a, b) => {
    // createDate는 문자열이므로 Date 객체로 변환
    const dateA = new Date(a.createDate).getTime();
    const dateB = new Date(b.createDate).getTime();

    return dateB - dateA; // 최신 날짜가 앞으로 오도록 내림차순 정렬
  });

  return sortedNotes;
}

// 작성순
export function sortByCreatedDate(notes: Note[]): Note[] {
  const sortedNotes = [...notes];

  sortedNotes.sort((a, b) => {
    const dateA = new Date(a.createDate).getTime();
    const dateB = new Date(b.createDate).getTime();

    return dateA - dateB;
  });

  return sortedNotes;
}

// 최신 수정
export function sortByEditedDate(notes: Note[]): Note[] {
  const sortedNotes = [...notes];

  sortedNotes.sort((a, b) => {
    const dateA = new Date(a.updateDate).getTime();
    const dateB = new Date(b.updateDate).getTime();

    return dateB - dateA;
  });

  return sortedNotes;
}
