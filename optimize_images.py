import os
from PIL import Image

def optimize():
    base_dir = r"C:\GeminiProjects\Blog de recettes de Papy Marcel\carnet-recettes-marcel\public\images"
    recipes_dir = os.path.join(base_dir, "recipes")
    
    # 1. Optimiser marcel.png (Le visage de Papy Marcel)
    marcel_path = os.path.join(base_dir, "marcel.png")
    if os.path.exists(marcel_path):
        print(f"--- Optimisation de {os.path.basename(marcel_path)} ---")
        img = Image.open(marcel_path)
        img = img.resize((400, 400), Image.LANCZOS)
        # On le garde en PNG pour la transparence si besoin, mais on l'optimise
        img.save(marcel_path, "PNG", optimize=True)
        print(f"Terminé : {os.path.basename(marcel_path)} a été réduit.")

    # 2. Optimiser les recettes (Conversion en WebP pour la rapidité)
    if os.path.exists(recipes_dir):
        print("\n--- Optimisation des recettes (PNG -> WebP) ---")
        for filename in os.listdir(recipes_dir):
            if filename.endswith(".png"):
                file_path = os.path.join(recipes_dir, filename)
                new_filename = filename.replace(".png", ".webp")
                new_path = os.path.join(recipes_dir, new_filename)
                
                img = Image.open(file_path)
                # On garde une qualité de 85 (très bonne, mais fichier bien plus léger)
                img.save(new_path, "WEBP", quality=85)
                print(f"Converti : {filename} -> {new_filename}")
                
                # Optionnel : On peut supprimer l'ancien PNG pour gagner de la place
                # os.remove(file_path)

if __name__ == "__main__":
    optimize()
