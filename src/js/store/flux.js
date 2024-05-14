const getState = ({ getActions, setStore }) => {
	return {
		store: {
			user: null,
			contacts: [],
		},

		actions: {
			saveContact: async (contactData) => {
				try {
					console.log("Saving contact", contactData);

					const response = await fetch(
						"https://playground.4geeks.com/contact/agendas/jpaliaga10/contacts",
						{
							method: "POST",
							body: JSON.stringify(contactData),
							headers: {
								"Content-Type": "application/json",
							},
						}
					);
					const data = await response.json();
					console.log("Server answer", data);
					return data;
				} catch (error) {
					console.error("Error saving contact:", error);
					throw new Error("Error saving contact");
				}
			},

			createUser: async (userId) => {
				const getUser = getActions().getUser;

				await fetch(`https://playground.4geeks.com/contact/agendas/${userId}`, {
					method: "POST",
				}).then((resp) => {
					if (resp.ok) {
						alert("User created successfully");
						getUser(userId);
					}
				});
			},

			getUser: async (userId) => {
				const createUser = getActions().createUser;
				await fetch(`https://playground.4geeks.com/contact/agendas/${userId}`)
					.then((resp) => {
						if (!resp.ok) {
							createUser(userId);
						}
						return resp.json();
					})
					.then((user) => {
						setStore({ user: user });
					})
					.catch((err) => console.log(err));
			},

			getContacts: async (userId) => {
				const resp = await fetch(
					`https://playground.4geeks.com/contact/agendas/${userId}/contacts`,
					{
						method: "GET",
						body: JSON.stringify(),
						headers: {
							"Content-Type": "application/json",
						},
					}
				);
				const data = await resp.json();
				setStore({ contacts: data });
			},

			editContact: async (userId, contactId, contactData) => {
				console.log(
					"Editing contact",
					contactId,
					"for user",
					userId,
					"with data:",
					contactData
				);
				console.log("UserId", userId.slug);

				const response = await fetch(
					`https://playground.4geeks.com/contact/agendas/${userId.slug}/contacts/${contactId}`,
					{
						method: "PUT",
						body: JSON.stringify(contactData),
						headers: {
							"Content-Type": "application/json",
						},
					}
				);
				const data = await response.json();
				console.log("Server answer", data);

				if (response.ok) {
					alert("Contact successfully edited.");
				}

				return data;
			},
			deleteContact: async (contactId) => {
				console.log("Deleting contact", contactId, "for user");
				const { getContacts } = getActions();
				const response = await fetch(
					`https://playground.4geeks.com/contact/agendas/jpaliaga10/contacts/${contactId}`,
					{
						method: "DELETE"
					}
				);
				if (response.ok) {
					alert("Contact successfully deleted!")
					getContacts("jpaliaga10");
				}
			}
		},
	};
};


export default getState;
