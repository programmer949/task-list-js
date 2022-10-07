const main = document.querySelector("main");
const taskContainer = document.querySelector(".all-tasks");
const input = document.querySelector("input");
let tasks = JSON.parse(localStorage.getItem("tasks"));
let state;
let array = tasks;

const importTasks = (array) => {
    input.focus();
    if (array) {
        for (let i = 0; i < array.length; i++) {
            const container = document.createElement("div");
            container.className = "container";
            container.id = array[i].id;
            const wrapper = document.createElement("span");
            const task = document.createElement("input");
            task.value = array[i].text;
            task.className = "task";
            wrapper.append(task);
            const controls = document.createElement("div");
            controls.className = "controls";
            controls.innerHTML =
                '<svg class="delete-button" onclick="handleRemove(this)" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 1000 1000" xml:space="preserve"><g><path d="M500,850c12.9,0,23.3-10.4,23.3-23.3v-490c0-12.9-10.4-23.3-23.3-23.3c-12.9,0-23.3,10.4-23.3,23.3v490C476.7,839.5,487.1,850,500,850z M383.3,850c12.9,0,23.3-10.4,23.3-23.3l-23.3-490c0-12.9-10.4-23.3-23.3-23.3c-12.9,0-23.3,10.4-23.3,23.3l23.3,490C360,839.5,370.4,850,383.3,850z M920,173.3H710v-70c0-51.5-41.8-93.3-93.3-93.3H383.3c-51.5,0-93.3,41.8-93.3,93.3v70H80c-12.9,0-23.3,10.4-23.3,23.3c0,12.9,10.4,23.3,23.3,23.3h97.9l65.5,676.7c0,51.6,41.8,93.3,93.3,93.3h326.7c51.6,0,93.3-41.8,93.3-93.3L822.1,220H920c12.9,0,23.3-10.5,23.3-23.3C943.3,183.8,932.9,173.3,920,173.3z M336.7,103.3c0-25.8,20.9-46.7,46.7-46.7h233.3c25.8,0,46.7,20.9,46.7,46.7v70H336.7V103.3z M710,896.7c0,25.8-20.9,46.7-46.7,46.7H336.7c-25.8,0-46.7-20.9-46.7-46.7L224.5,220h551L710,896.7z M616.7,850c12.9,0,23.3-10.4,23.3-23.3l23.3-490c0-12.9-10.4-23.3-23.3-23.3c-12.9,0-23.3,10.4-23.3,23.3l-23.3,490C593.3,839.5,603.8,850,616.7,850z"></path></g></svg><svg class="edit-button" onclick="handleEdit(this)" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 106.86 122.88" xml:space="preserve"><g><path class="st0" d="M39.62,64.58c-1.46,0-2.64-1.41-2.64-3.14c0-1.74,1.18-3.14,2.64-3.14h34.89c1.46,0,2.64,1.41,2.64,3.14 c0,1.74-1.18,3.14-2.64,3.14H39.62L39.62,64.58z M46.77,116.58c1.74,0,3.15,1.41,3.15,3.15c0,1.74-1.41,3.15-3.15,3.15H7.33 c-2.02,0-3.85-0.82-5.18-2.15C0.82,119.4,0,117.57,0,115.55V7.33c0-2.02,0.82-3.85,2.15-5.18C3.48,0.82,5.31,0,7.33,0h90.02 c2.02,0,3.85,0.83,5.18,2.15c1.33,1.33,2.15,3.16,2.15,5.18v50.14c0,1.74-1.41,3.15-3.15,3.15c-1.74,0-3.15-1.41-3.15-3.15V7.33 c0-0.28-0.12-0.54-0.31-0.72c-0.19-0.19-0.44-0.31-0.72-0.31H7.33c-0.28,0-0.54,0.12-0.73,0.3C6.42,6.8,6.3,7.05,6.3,7.33v108.21 c0,0.28,0.12,0.54,0.3,0.72c0.19,0.19,0.45,0.31,0.73,0.31H46.77L46.77,116.58z M98.7,74.34c-0.51-0.49-1.1-0.72-1.78-0.71 c-0.68,0.01-1.26,0.27-1.74,0.78l-3.91,4.07l10.97,10.59l3.95-4.11c0.47-0.48,0.67-1.1,0.66-1.78c-0.01-0.67-0.25-1.28-0.73-1.74 L98.7,74.34L98.7,74.34z M78.21,114.01c-1.45,0.46-2.89,0.94-4.33,1.41c-1.45,0.48-2.89,0.97-4.33,1.45 c-3.41,1.12-5.32,1.74-5.72,1.85c-0.39,0.12-0.16-1.48,0.7-4.81l2.71-10.45l0,0l20.55-21.38l10.96,10.55L78.21,114.01L78.21,114.01 z M39.62,86.95c-1.46,0-2.65-1.43-2.65-3.19c0-1.76,1.19-3.19,2.65-3.19h17.19c1.46,0,2.65,1.43,2.65,3.19 c0,1.76-1.19,3.19-2.65,3.19H39.62L39.62,86.95z M39.62,42.26c-1.46,0-2.64-1.41-2.64-3.14c0-1.74,1.18-3.14,2.64-3.14h34.89 c1.46,0,2.64,1.41,2.64,3.14c0,1.74-1.18,3.14-2.64,3.14H39.62L39.62,42.26z M24.48,79.46c2.06,0,3.72,1.67,3.72,3.72 c0,2.06-1.67,3.72-3.72,3.72c-2.06,0-3.72-1.67-3.72-3.72C20.76,81.13,22.43,79.46,24.48,79.46L24.48,79.46z M24.48,57.44 c2.06,0,3.72,1.67,3.72,3.72c0,2.06-1.67,3.72-3.72,3.72c-2.06,0-3.72-1.67-3.72-3.72C20.76,59.11,22.43,57.44,24.48,57.44 L24.48,57.44z M24.48,35.42c2.06,0,3.72,1.67,3.72,3.72c0,2.06-1.67,3.72-3.72,3.72c-2.06,0-3.72-1.67-3.72-3.72 C20.76,37.08,22.43,35.42,24.48,35.42L24.48,35.42z"></path></g></svg>';
            container.append(wrapper, controls);
            taskContainer.append(container);
        }
    }
};

window.onload = () => importTasks(tasks);

main.addEventListener("keydown", (e) => {
    state = input.value;
    if (e.key === "Enter" && state) {
        const id = Math.floor(Math.random() * 99999999);
        tasks.push({ text: state, id });
        localStorage.setItem("tasks", JSON.stringify(tasks));
        const container = document.createElement("div");
        container.className = "container";
        container.id = id;
        const wrapper = document.createElement("span");
        const task = document.createElement("input");
        task.value = state;
        task.className = "task";
        wrapper.append(task);
        const controls = document.createElement("div");
        controls.className = "controls";
        controls.innerHTML =
            '<svg class="delete-button" onclick="handleRemove(this)" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 1000 1000" xml:space="preserve"><g><path d="M500,850c12.9,0,23.3-10.4,23.3-23.3v-490c0-12.9-10.4-23.3-23.3-23.3c-12.9,0-23.3,10.4-23.3,23.3v490C476.7,839.5,487.1,850,500,850z M383.3,850c12.9,0,23.3-10.4,23.3-23.3l-23.3-490c0-12.9-10.4-23.3-23.3-23.3c-12.9,0-23.3,10.4-23.3,23.3l23.3,490C360,839.5,370.4,850,383.3,850z M920,173.3H710v-70c0-51.5-41.8-93.3-93.3-93.3H383.3c-51.5,0-93.3,41.8-93.3,93.3v70H80c-12.9,0-23.3,10.4-23.3,23.3c0,12.9,10.4,23.3,23.3,23.3h97.9l65.5,676.7c0,51.6,41.8,93.3,93.3,93.3h326.7c51.6,0,93.3-41.8,93.3-93.3L822.1,220H920c12.9,0,23.3-10.5,23.3-23.3C943.3,183.8,932.9,173.3,920,173.3z M336.7,103.3c0-25.8,20.9-46.7,46.7-46.7h233.3c25.8,0,46.7,20.9,46.7,46.7v70H336.7V103.3z M710,896.7c0,25.8-20.9,46.7-46.7,46.7H336.7c-25.8,0-46.7-20.9-46.7-46.7L224.5,220h551L710,896.7z M616.7,850c12.9,0,23.3-10.4,23.3-23.3l23.3-490c0-12.9-10.4-23.3-23.3-23.3c-12.9,0-23.3,10.4-23.3,23.3l-23.3,490C593.3,839.5,603.8,850,616.7,850z"></path></g></svg><svg class="edit-button" onclick="handleEdit(this)" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 106.86 122.88" xml:space="preserve"><g><path class="st0" d="M39.62,64.58c-1.46,0-2.64-1.41-2.64-3.14c0-1.74,1.18-3.14,2.64-3.14h34.89c1.46,0,2.64,1.41,2.64,3.14 c0,1.74-1.18,3.14-2.64,3.14H39.62L39.62,64.58z M46.77,116.58c1.74,0,3.15,1.41,3.15,3.15c0,1.74-1.41,3.15-3.15,3.15H7.33 c-2.02,0-3.85-0.82-5.18-2.15C0.82,119.4,0,117.57,0,115.55V7.33c0-2.02,0.82-3.85,2.15-5.18C3.48,0.82,5.31,0,7.33,0h90.02 c2.02,0,3.85,0.83,5.18,2.15c1.33,1.33,2.15,3.16,2.15,5.18v50.14c0,1.74-1.41,3.15-3.15,3.15c-1.74,0-3.15-1.41-3.15-3.15V7.33 c0-0.28-0.12-0.54-0.31-0.72c-0.19-0.19-0.44-0.31-0.72-0.31H7.33c-0.28,0-0.54,0.12-0.73,0.3C6.42,6.8,6.3,7.05,6.3,7.33v108.21 c0,0.28,0.12,0.54,0.3,0.72c0.19,0.19,0.45,0.31,0.73,0.31H46.77L46.77,116.58z M98.7,74.34c-0.51-0.49-1.1-0.72-1.78-0.71 c-0.68,0.01-1.26,0.27-1.74,0.78l-3.91,4.07l10.97,10.59l3.95-4.11c0.47-0.48,0.67-1.1,0.66-1.78c-0.01-0.67-0.25-1.28-0.73-1.74 L98.7,74.34L98.7,74.34z M78.21,114.01c-1.45,0.46-2.89,0.94-4.33,1.41c-1.45,0.48-2.89,0.97-4.33,1.45 c-3.41,1.12-5.32,1.74-5.72,1.85c-0.39,0.12-0.16-1.48,0.7-4.81l2.71-10.45l0,0l20.55-21.38l10.96,10.55L78.21,114.01L78.21,114.01 z M39.62,86.95c-1.46,0-2.65-1.43-2.65-3.19c0-1.76,1.19-3.19,2.65-3.19h17.19c1.46,0,2.65,1.43,2.65,3.19 c0,1.76-1.19,3.19-2.65,3.19H39.62L39.62,86.95z M39.62,42.26c-1.46,0-2.64-1.41-2.64-3.14c0-1.74,1.18-3.14,2.64-3.14h34.89 c1.46,0,2.64,1.41,2.64,3.14c0,1.74-1.18,3.14-2.64,3.14H39.62L39.62,42.26z M24.48,79.46c2.06,0,3.72,1.67,3.72,3.72 c0,2.06-1.67,3.72-3.72,3.72c-2.06,0-3.72-1.67-3.72-3.72C20.76,81.13,22.43,79.46,24.48,79.46L24.48,79.46z M24.48,57.44 c2.06,0,3.72,1.67,3.72,3.72c0,2.06-1.67,3.72-3.72,3.72c-2.06,0-3.72-1.67-3.72-3.72C20.76,59.11,22.43,57.44,24.48,57.44 L24.48,57.44z M24.48,35.42c2.06,0,3.72,1.67,3.72,3.72c0,2.06-1.67,3.72-3.72,3.72c-2.06,0-3.72-1.67-3.72-3.72 C20.76,37.08,22.43,35.42,24.48,35.42L24.48,35.42z"></path></g></svg>';
        container.append(wrapper, controls);
        taskContainer.append(container);
        input.value = "";
    } else if (!localStorage.getItem("tasks")) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
        return;
    }
});

const handleRemove = (e) => {
    tasks = JSON.parse(localStorage.getItem("tasks"));
    localStorage.setItem(
        "tasks",
        JSON.stringify(
            tasks.filter((task) => task.id != e.parentNode.parentNode.id)
        )
    );
    e.parentNode.parentNode.remove();
    input.focus();
};

const handleEdit = (e) => {
    if (
        e.parentNode.parentNode.id &&
        e.parentNode.parentNode.className === "container" &&
        e.parentNode.parentNode.tagName == "DIV"
    ) {
        const task = e.parentNode.parentNode;
        const wrapper = e.parentNode.parentNode.firstChild;
        const originalInput = e.parentNode.parentNode.firstChild.firstChild;
        const controls = e.parentNode;
        const inputEdit = document.createElement("input");
        inputEdit.className = "edit-input";
        inputEdit.value = originalInput.value;
        originalInput.remove();
        controls.remove();
        const save = document.createElement("button");
        save.innerText = "Save";
        save.className = "save";
        save.addEventListener("click", () => {
            for (let i = 0; i < tasks.length; i++)
                if (task.id == tasks[i].id) tasks[i].text = inputEdit.value;
            taskContainer.innerHTML = "<h2>Tasks</h2><hr>";
            localStorage.setItem("tasks", JSON.stringify(tasks));
            importTasks(tasks);
        });
        window.addEventListener("keydown", (e) => {
            if (e.key === "Enter") return save.click();
        });
        wrapper.append(inputEdit);
        task.append(wrapper, save);
        inputEdit.focus();
    } else {
        location.reload();
    }
};
