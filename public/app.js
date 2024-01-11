document.addEventListener('click', async event => {
	if (event.target.dataset.type === 'remove') {
		const id = event.target.dataset.id

		remove(id).then(() => {
			event.target.closest('li').remove()
		})
	}

	if (event.target.dataset.type === 'edit') {
		const title = event.target.dataset.title
		const newTitle = prompt('Enter new note', title)

		if (newTitle !== null) {
			await edit(event.target.dataset.id, newTitle)
			event.target.closest('li').querySelector('span').textContent = newTitle
		}
	}
})

async function remove(id) {
	await fetch(`/${id}`, { method: 'DELETE' })
}

async function edit(id, title) {
	await fetch(`/${id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ title }),
	})
}
