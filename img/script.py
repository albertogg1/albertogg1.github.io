from PIL import Image

# Cargar la imagen original
img = Image.open("D:\\xampp\\htdocs\\albertogg1.github.io\\img\\juliacastrog.png").convert("RGBA")
data = img.getdata()

nuevo_color = (22, 34, 46)  # sin alfa

nuevos_pixeles = []
for (r, g, b, a) in data:
    if a > 0:
        # Si el pixel no es transparente, cambias su color
        nuevos_pixeles.append((nuevo_color[0], nuevo_color[1], nuevo_color[2], a))
    else:
        # Si es transparente, lo dejas tal cual
        nuevos_pixeles.append((r, g, b, a))

img.putdata(nuevos_pixeles)
# Guardar la imagen resultante
img.save("D:\\xampp\\htdocs\\albertogg1.github.io\\img\\juliacastrog_editada.png")