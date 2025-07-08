import { test, expect, type Page } from "@playwright/test";
import type { Todo } from "../helpers/types";

export async function getTodosFromStorage(page: Page) {
  return await page.evaluate(() => {
    return JSON.parse(localStorage.getItem("todos") || "[]");
  });
}

test.describe("Todo App", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => localStorage.clear());
  });

  test("Инпут виден, при вводе текста и нажатии Enter - запись добавляется, UI изменяется, local storage обновляется", async ({
    page,
  }) => {
    const input = page.locator('[data-testid="new-task-input"]');
    const items = page.locator('[data-testid="todo-list"] li');
    const filterCounter = page.locator('[data-testid="filter-counter"]');

    const inputTestText = "Test task from playwright";

    await expect(input).toBeVisible();
    await input.fill(inputTestText);
    await page.keyboard.press("Enter");

    // запись появилась в разметке
    const firstItem = items.first();
    await expect(firstItem).toContainText(inputTestText);

    const todosFromStorage = await getTodosFromStorage(page);
    const uncompletedTodosCounter = todosFromStorage.filter(
      (todo: Todo) => !todo.completed
    );

    // в local storage запись появилась
    expect(
      todosFromStorage.some((todo: Todo) => todo.text === inputTestText)
    ).toBeTruthy();

    // кол-во записей разметки === кол-ву записей в local storage
    const itemsCounterAfter = await items.count();
    expect(todosFromStorage.length).toBe(itemsCounterAfter);

    // счетчик обновился (кол-во не выполненных задач === цифре в счетсчике)
    await expect(filterCounter).toContainText(
      String(uncompletedTodosCounter.length)
    );
  });

  test("Можно пометить задачу как выполненную и наоборот, обновление UI , обновление local storage", async ({
    page,
  }) => {
    const input = page.locator('[data-testid="new-task-input"]');
    const inputTestText = "Test task from playwright";
    await input.fill(inputTestText);
    await page.keyboard.press("Enter");

    // запись появилась в разметке
    const firstItem = page.locator('[data-testid="todo-list"] li').first();
    await expect(firstItem).toContainText(inputTestText);

    await firstItem.click();

    // checkbox в положении checked
    const checkbox = firstItem.locator('input[type="checkbox"]');
    await expect(checkbox).toBeChecked();

    // в local storage запись checked
    const todosAfterCheck = await getTodosFromStorage(page);
    expect(todosAfterCheck[0].completed).toBe(true);

    await firstItem.click();

    // checkbox в положении unchecked
    await expect(checkbox).not.toBeChecked();

    // в local storage запись unchecked
    const test = await getTodosFromStorage(page);
    expect(test[0].completed).toBe(false);
  });

  test("Очистка завершенных задач", async ({ page }) => {
    const input = page.locator('[data-testid="new-task-input"]');
    const inputTestText = "Test task from playwright";
    await input.fill(inputTestText);
    await page.keyboard.press("Enter");

    const firstItem = page.locator('[data-testid="todo-list"] li').first();
    await firstItem.click();

    const todosFromStorage = await getTodosFromStorage(page);

    const clearButton = page.locator('[data-testid="clear-button"]');
    await expect(clearButton).toBeVisible();
    await clearButton.click();

    const hasTodosCompeted = todosFromStorage.some(
      (todo: Todo) => todo.completed
    );

    expect(hasTodosCompeted).toBe(true);
  });

  test("Фильтрация при клике active", async ({ page }) => {
    const input = page.locator('[data-testid="new-task-input"]');
    const inputTestText = "Test task from playwright";
    await input.fill(inputTestText);
    await page.keyboard.press("Enter");

    const items = page.locator('[data-testid="todo-list"] li');
    const firstItem = items.first();
    await firstItem.click();

    const activeButton = page.locator('[data-testid="button-active"]');
    await activeButton.click();

    const todosFromStorage = await getTodosFromStorage(page);

    const activeTodosCounter = todosFromStorage.filter(
      (todo: Todo) => !todo.completed
    ).length;

    expect(await items.count()).toBe(activeTodosCounter);
  });

  test("Фильтрация при клике completed", async ({ page }) => {
    const input = page.locator('[data-testid="new-task-input"]');
    const inputTestText = "Test task from playwright";
    await input.fill(inputTestText);
    await page.keyboard.press("Enter");

    const items = page.locator('[data-testid="todo-list"] li');
    const firstItem = items.first();
    await firstItem.click();

    const completedButton = page.locator('[data-testid="button-completed"]');
    await completedButton.click();

    const todosFromStorage = await getTodosFromStorage(page);

    const completedTodosCounter = todosFromStorage.filter(
      (todo: Todo) => todo.completed
    ).length;

    expect(await items.count()).toBe(completedTodosCounter);
  });
});
