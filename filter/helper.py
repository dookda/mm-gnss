import sys

symbol, count = sys.argv[1], sys.argv[2]

pattern = symbol * int(count)

sys.stdout.write(pattern)
