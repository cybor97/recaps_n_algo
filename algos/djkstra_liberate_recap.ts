// prefefined by TT
function getLinks(pageUrl: string): string[] {
  const pageLinks: Record<string, string[]> = {
    page1: ["page2", "page3"],
    page2: ["page1"],
    page3: ["page4"],
    page4: [],
  };

  return pageLinks[pageUrl] || [];
}

// predefined by TT
interface PathResult {
  clicks: number;
  path: string[];
}

function getNodes(
  startUrl: string,
  visited: Set<string> = new Set<string>(),
): string[] {
  const nodes: Set<string> = new Set<string>();
  nodes.add(startUrl);
  for (const link of getLinks(startUrl)) {
    if (!visited.has(link)) {
      visited.add(link);
      for (const node of getNodes(link, visited)) {
        nodes.add(node);
      }
    }
  }
  return [...nodes];
}

console.log(getNodes("page1"));

// args & return value are defined by TT
function getDistance(startUrl: string, targetUrl: string): PathResult {
  if (startUrl === targetUrl) {
    return { clicks: 0, path: [] };
  }
  const links = getLinks(startUrl);
  if (links.includes(targetUrl)) {
    return { clicks: 1, path: [startUrl, targetUrl] };
  }

  const visited = new Set<string>();
  const distances: Map<string, number> = new Map<string, number>();
  const paths: Map<string, string[]> = new Map<string, string[]>();
  const nodes = getNodes(startUrl);

  for (const node of nodes) {
    distances.set(node, Infinity);
  }
  distances.set(startUrl, 0);

  while (nodes.length > 0) {
    const node = nodes.shift() as string;

    if (distances.get(node) === Infinity) {
      break;
    }

    visited.add(node);

    for (const neighbor of getLinks(node)) {
      if (visited.has(neighbor)) {
        continue;
      }

      const distance = (distances.get(node) ?? Infinity) + 1;
      if (distance < (distances.get(neighbor) ?? Infinity)) {
        distances.set(neighbor, distance);
        paths.set(neighbor, [...(paths.get(node) ?? []), node]);
      }
    }
  }

  const distance = distances.get(targetUrl);
  const path = paths.get(targetUrl);
  return {
    clicks: distance ?? -1,
    path: path ? [...path.slice(1), targetUrl] : [],
  };
}

console.log('getDistance("page1", "page1")', getDistance("page1", "page1"));
console.log('getDistance("page1", "page4")', getDistance("page1", "page4"));
console.log('getDistance("page2", "page3")', getDistance("page2", "page3"));
console.log('getDistance("page4", "page1")', getDistance("page4", "page1"));
