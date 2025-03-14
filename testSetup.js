import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest"; // Asegúrate de que estés importando la versión correcta de jest-dom para Vitest

afterEach(() => {
  cleanup();
});
