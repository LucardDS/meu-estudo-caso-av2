const { renderStudentList } = require('./menu.js');

test('deve renderizar a lista de alunos corretamente', () => {
    const students = [{ name: 'João' }, { name: 'Maria' }];
    document.body.innerHTML = `<div id="studentList"></div>`;
    renderStudentList(students);
    const items = document.querySelectorAll('.student-item');
    expect(items.length).toBe(2);
    expect(items[0].textContent).toBe('João');
    expect(items[1].textContent).toBe('Maria');
});