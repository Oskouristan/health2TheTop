import os

def list_files_and_directories_recursively(starting_directory):
    file_list = []
    for root, dirs, files in os.walk(starting_directory):
        # Ignore les dossiers node_modules et .git
        dirs[:] = [d for d in dirs if d not in ['node_modules', '.git']]
        
        # Ajoute chaque répertoire rencontré
        for directory in dirs:
            file_list.append(os.path.join(root, directory))
        # Ajoute chaque fichier rencontré
        for file in files:
            file_list.append(os.path.join(root, file))
    return file_list

# Le répertoire de départ (répertoire actuel)
starting_directory = '.'
file_list = list_files_and_directories_recursively(starting_directory)

# Sauvegarde la liste dans un fichier texte
with open("file_list.txt", "w") as f:
    for item_path in file_list:
        f.write(item_path + "\n")

print("Liste complète des fichiers et sous-répertoires générée dans file_list.txt")
