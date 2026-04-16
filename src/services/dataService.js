import api from "./api";

export const sendMessage = async (message) => {
    try {
        const response = await api.post("/Contact", message);
        return (response.data);
    } catch(error) {
        console.error("Error sending message: ", error);
        return null;
    }
}

export const fetchMessages = async () => {
    try {
        const response = await api.get("/Contact");
        console.log("Fetched Messages: ", response.data);
        return (response.data);
    } catch (error) {
        console.error("Error fetching messages:", error);
        return null;
    }
};

export const fetchMessageCount = async () => {
    try {
        const response = await api.get("/Contact");
        return (response.data.length);
    } catch (error) {
        console.error("Error fetching message count:", error);
        return 0;
    }
};

export const fetchProjectCount = async () => {
    try {
        const response = await api.get("/Project");
        return (response.data.length);
    } catch (error) {
        console.error("Error fetching project count:", error);
        return 0;
    }
}

export const fetchProjects = async () => {
    try {
        const response = await api.get("/Project");
        return (response.data);
    } catch (error) {
        console.error("Error fetching projects: ", error);
        return null;
    }
}

export const addNewProject = async (project) => {
    try {
        const response = await api.post("/Project", project);
        return response.data;
    } catch (error) {
        console.error("Error adding project: ", error);
        alert("Failed to add project.");
        return null;
    }
}

export const editProject = async (id, data) => {
    try {
        const response = await api.put(`/Project/${id}`, data);
        return response.data;
    } catch(error) {
        console.error("Error editting project: ", error);
        return null;
    }
}

export const projects = [
    {
        id: 1,
        title: "Employee Management System",
        description:
            "Built a full stack employee system that reduced manual tracking by 60%, featuring secure authentication and REST APIs.",
        technologies: "React, ASP.NET, SQLite",
        githubUrl: "#",
        liveUrl: "#",
    },
    {
        id: 2,
        title: "E-Learning Platform",
        description:
            "Online learning platform with courses, authentication, and admin dashboard.",
        technologies: "React, Django, SQLite",
        githubUrl: "#",
        liveUrl: "#",
    },
    {
        id: 3,
        title: "Portfolio Website",
        description:
            "Personal portfolio built with React and ASP.NET backend integration.",
        technologies: "React, ASP.NET, SQL Server",
        githubUrl: "#",
        liveUrl: "#",
    },
];