import copy

def dfs(ar, idx, su, k):
    if idx == len(ar) - 1:
        return su
    for i, v in enumerate(ar[idx + 1:idx + 1 + k]):
        ar[idx], ar[idx+1+i] = ar[idx+1+i], ar[idx]
        return dfs(ar, idx+1+i, su+1, k)


def solution(arr, k):
    up = copy.copy(arr)
    a = []
    while up:
        ma = max(up)
        idx = up.index(ma)

        a.append(dfs(arr, idx, 0, k))
        up.pop()
    return a

print(solution(	[5, 4, 3, 2, 1], 4))