import { render, screen } from "@testing-library/react";
import Blog from "./Blog";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

// Mock de las funciones de servicio
vi.mock("../services/blogs", () => ({
  update: vi.fn(),
}));

describe("Blog component", () => {
  const blog = {
    _id: "67d17703ab8196301744afd2",
    title: "Ke te pasa crack",
    author: "Jose Manuel",
    url: "https://fullstackopen.com/es/part6",
    likes: 9,
    user: {
      _id: "67d03c683414647a1d9b47c7", // Usuario correcto
      name: "Fernando Álvarez",
      username: "fernando",
    },
  };

  const user = {
    username: "fernando", // Usuario correcto
  };

  const updateBlog = vi.fn();
  const deleteBlog = vi.fn();

  beforeEach(() => {
    render(
      <Blog
        blog={blog}
        updateBlog={updateBlog}
        deleteBlog={deleteBlog}
        user={user}
      />
    );
  });

  test("renders blog content and allows liking", async () => {
    // Comprobar que el título y el autor están visibles
    expect(screen.getByText(/ke te pasa crack/i)).toBeInTheDocument();
    expect(screen.getByText(/jose manuel/i)).toBeInTheDocument();

    // Verificar que "likes" y la URL NO están visibles de inicio
    expect(screen.queryByText(/likes: 9/i)).not.toBeInTheDocument();
    expect(
      screen.queryByText(/https:\/\/fullstackopen\.com\/es\/part6/i)
    ).not.toBeInTheDocument();

    // Hacer click en "view" para mostrar detalles
    const viewButton = screen.getByText(/view/i);
    await userEvent.click(viewButton);

    // Verificar que "likes" y la URL AHORA sí aparecen
    expect(screen.getByText(/likes: 9/i)).toBeInTheDocument();
    expect(
      screen.getByText("https://fullstackopen.com/es/part6")
    ).toBeInTheDocument();
  });
});
