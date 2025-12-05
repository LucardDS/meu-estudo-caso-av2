document.addEventListener('DOMContentLoaded', () => {
    const studentListDiv = document.getElementById('studentList');
    const studentDetailsDiv = document.getElementById('studentDetails');
    const listButton = document.getElementById('listButton');
    const detailsButton = document.getElementById('detailsButton');
    
    let students = [];

    async function fetchStudents() {
        try {
            const response = await fetch('https://api.example.com/students');
            students = await response.json();
            renderStudentList();
        } catch (error) {
            console.error('Erro ao buscar alunos:', error);
        }
    }

    function renderStudentList() {
        studentListDiv.innerHTML = '';
        students.forEach(student => {
            const studentItem = document.createElement('div');
            studentItem.className = 'student-item';
            studentItem.textContent = student.name;
            studentItem.onclick = () => showStudentDetails(student);
            studentListDiv.appendChild(studentItem);
        });
    }

    function showStudentDetails(student) {
        studentDetailsDiv.innerHTML = `
            <h2>Detalhes de ${student.name}</h2>
            <p>ID: ${student.id}</p>
            <p>Email: ${student.email}</p>
            <p>Curso: ${student.course}</p>
        `;
        studentListDiv.style.display = 'none';
        studentDetailsDiv.style.display = 'block';
        detailsButton.style.display = 'inline';
        listButton.style.display = 'inline';
    }

    function showStudentList() {
        studentListDiv.style.display = 'block';
        studentDetailsDiv.style.display = 'none';
        detailsButton.style.display = 'none';
        listButton.style.display = 'none';
    }

    listButton.addEventListener('click', showStudentList);
    detailsButton.addEventListener('click', showStudentList);

    fetchStudents();
});