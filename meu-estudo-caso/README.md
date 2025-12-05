### Estrutura de Arquivos

```
/projeto
│
├── index.html
├── style.css
└── menu.js
```

### 1. `index.html`

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Listagem de Alunos</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div id="app">
        <header>
            <h1>Lista de Alunos</h1>
            <nav>
                <button id="listButton">Lista de Alunos</button>
                <button id="detailsButton" style="display:none;">Detalhes do Aluno</button>
            </nav>
        </header>
        <main id="mainContent">
            <div id="studentList"></div>
            <div id="studentDetails" style="display:none;"></div>
        </main>
    </div>
    <script src="menu.js"></script>
</body>
</html>
```

### 2. `style.css`

```css
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 20px;
    background-color: #f4f4f4;
}

header {
    margin-bottom: 20px;
}

nav button {
    margin-right: 10px;
}

#studentList, #studentDetails {
    background: white;
    padding: 15px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.student-item {
    cursor: pointer;
    margin: 5px 0;
}

.student-item:hover {
    background-color: #eaeaea;
}
```

### 3. `menu.js`

```javascript
document.addEventListener('DOMContentLoaded', () => {
    const studentListDiv = document.getElementById('studentList');
    const studentDetailsDiv = document.getElementById('studentDetails');
    const listButton = document.getElementById('listButton');
    const detailsButton = document.getElementById('detailsButton');
    
    let students = [];

    // Função para buscar alunos da API
    async function fetchStudents() {
        try {
            const response = await fetch('https://api.example.com/students'); // Substitua pela URL da sua API
            students = await response.json();
            renderStudentList();
        } catch (error) {
            console.error('Erro ao buscar alunos:', error);
        }
    }

    // Função para renderizar a lista de alunos
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

    // Função para mostrar detalhes do aluno
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

    // Função para voltar à lista de alunos
    function showStudentList() {
        studentListDiv.style.display = 'block';
        studentDetailsDiv.style.display = 'none';
        detailsButton.style.display = 'none';
        listButton.style.display = 'none';
    }

    // Eventos de clique
    listButton.addEventListener('click', showStudentList);
    detailsButton.addEventListener('click', showStudentList);

    // Inicializa a aplicação
    fetchStudents();
});
```

### Testes Automatizados

Para realizar testes automatizados, você pode usar uma biblioteca como o Jest ou o Mocha. Aqui está um exemplo básico de como você poderia estruturar um teste usando Jest.

#### Exemplo de Teste com Jest

1. Instale o Jest (se estiver usando Node.js):

```bash
npm install --save-dev jest
```

2. Crie um arquivo de teste, por exemplo, `menu.test.js`:

```javascript
const { renderStudentList } = require('./menu.js'); // Ajuste conforme necessário

test('deve renderizar a lista de alunos corretamente', () => {
    const students = [{ name: 'João' }, { name: 'Maria' }];
    document.body.innerHTML = `<div id="studentList"></div>`;
    renderStudentList(students);
    const items = document.querySelectorAll('.student-item');
    expect(items.length).toBe(2);
    expect(items[0].textContent).toBe('João');
    expect(items[1].textContent).toBe('Maria');
});
```

3. Execute os testes:

```bash
npx jest
```

### Considerações Finais

- Certifique-se de substituir a URL da API no código JavaScript pela URL real que você deseja usar.
- Os testes automatizados são um exemplo básico e podem ser expandidos conforme necessário.
- Você pode adicionar mais funcionalidades e estilos conforme a necessidade do seu projeto.