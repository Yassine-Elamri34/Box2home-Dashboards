#!/bin/bash

# Define the paths to the projects
back_project_path="/Users/yassinelamri/Desktop/dashboard-kpi/b2h_dashboard_kpi_web_back"
front_project_path="/Users/yassinelamri/Desktop/dashboard-kpi/b2h_dashboard_kpi_web_front"

# Function to update project
update_project() {
    local project_path=$1

    # Navigate to project directory
    cd "$project_path" || exit

    # Stash any local changes
    git stash

    # Pull latest changes from remote repository
    git pull

    # Apply stashed changes
    git stash pop
}

# Update back-end project
update_project "$back_project_path"

# Update front-end project
update_project "$front_project_path"

