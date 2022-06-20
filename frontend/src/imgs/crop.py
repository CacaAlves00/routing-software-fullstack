import cv2 as cv
import numpy as np

im = cv.imread('/home/dwight/UTFPR/Tópicos em Eng de Sof/projeto/frontend/src/imgs/bg-image.png')
im = im[:100, :]

cv.imshow('im', im)
cv.waitKey()

cv.imwrite('/home/dwight/UTFPR/Tópicos em Eng de Sof/projeto/frontend/src/imgs/bg-image2.png', im)
