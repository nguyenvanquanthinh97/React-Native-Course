import createDataContext from "./createDataContext";

interface BlogPost {
  id: number;
  title: string;
  content: string;
}

const reducer = (
  state: BlogPost[],
  action: {
    type: "add_blogpost" | "delete_blogpost" | "edit_blogpost";
    payload: unknown;
  }
) => {
  switch (action.type) {
    case "add_blogpost": {
      const blogPost = action.payload as { title: string; content: string };
      return [
        ...state,
        {
          id: Math.floor(Math.random() * 99999),
          ...blogPost,
        },
      ];
    }
    case "delete_blogpost": {
      const deletedId = action.payload as number;
      const updatedState = state.filter(
        (blogPost) => blogPost.id !== deletedId
      );
      return updatedState;
    }
    case "edit_blogpost": {
      const updatedState = [...state];
      const { id, title, content } = action.payload as BlogPost;

      const updatedBlogPost = updatedState.find(
        (blogPost) => blogPost.id === id
      )!;
      updatedBlogPost.title = title;

      updatedBlogPost.content = content;
      return updatedState;
    }
    default:
      return state;
  }
};

const addBlogPost =
  (dispatch: Function) =>
  (title: string, content: string, callback?: Function) => {
    dispatch({ type: "add_blogpost", payload: { title, content } });
    callback && callback();
  };

const deleteBlogPost = (dispatch: Function) => (id: number) => {
  dispatch({ type: "delete_blogpost", payload: id });
};

const editBlogPost =
  (dispatch: Function) =>
  (
    id: number,
    updatedTitle: string,
    updatedContent: string,
    callback?: Function
  ) => {
    dispatch({
      type: "edit_blogpost",
      payload: { id, title: updatedTitle, content: updatedContent },
    });
    callback && callback();
  };

export interface BlogContextValueInterface {
  state: BlogPost[];
  addBlogPost: (title: string, content: string, callback?: Function) => void;
  deleteBlogPost: (id: number) => void;
  editBlogPost: (
    id: number,
    updatedTitle: string,
    updatedContent: string,
    callback?: Function
  ) => void;
}

export const { Context: BlogContext, ContextProvider: BlogContextProvider } =
  createDataContext(reducer, { addBlogPost, deleteBlogPost, editBlogPost }, [
    { id: 1, title: "default post", content: "This is default post" },
  ]);
