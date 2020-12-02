import time
f = open("02/input.txt", "r")
start = time.time()

# PART 1
data  = f.read().split("\n")
count2 = 0
for item in data:
  element = item.split(" ")

  req =[ int(x) for x in element[0].split("-")]
  letter = element[1][0]
  string = element[2]

  count = string.count(letter)
  if (count >= req[0] and count <= req[1]):
      count2 += 1

print ("1: ", count2, (time.time()-start)*1000, "ms")

start = time.time()

# PART 2
count2 = 0
for item in data:
  element = item.split(" ")

  req =[ int(x) for x in element[0].split("-")]
  letter = element[1][0]
  string = element[2]

  a = string[req[0]-1] == letter 
  b = string[req[1]-1] == letter 

  if (a!=b):
     count2+= 1

print ("2:", count2, (time.time()-start)*1000, "ms")