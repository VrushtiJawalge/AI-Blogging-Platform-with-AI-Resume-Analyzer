  function showCreator() {
        creatorMode.style.display = "grid";
        analyzerMode.style.display = "none";
      }
      function showAnalyzer() {
        creatorMode.style.display = "none";
        analyzerMode.style.display = "block";
      }

      function analyzeBlog() {
        const text = document.getElementById("analyzeText").value.trim();
        if (!text) return alert("Paste blog content first");

        document.getElementById("previewBox").value = text;

        const words = text.match(/\b\w+\b/g) || [];
        const sentences = text.split(/[.!?]/).filter((s) => s.trim().length);
        const paragraphs = text.split(/\n+/).filter((p) => p.trim().length);

        const count = words.length;
        const readTime = Math.ceil(count / 200);

        const freq = {};
        words.forEach((w) => {
          w = w.toLowerCase();
          if (w.length > 3) freq[w] = (freq[w] || 0) + 1;
        });

        const sorted = Object.entries(freq).sort((a, b) => b[1] - a[1]);
        const topWords =
          sorted
            .slice(0, 3)
            .map((i) => i[0])
            .join(", ") || "—";

        const topCount = sorted[0]?.[1] || 0;
        const density = count ? ((topCount / count) * 100).toFixed(1) : 0;

        let seoScore = Math.min(
          100,
          (count > 600 ? 40 : count / 15) +
            (sentences.length > 10 ? 30 : sentences.length * 2) +
            (density < 3 ? 20 : 10) +
            (paragraphs.length > 4 ? 10 : 5),
        );

        const avgSentence = count / (sentences.length || 1);
        const readability =
          avgSentence < 18
            ? "Excellent"
            : avgSentence < 25
              ? "Good"
              : avgSentence < 30
                ? "Average"
                : "Hard";

        document.getElementById("wc").innerText = count;
        document.getElementById("time").innerText = readTime + " min";
        document.getElementById("seo").innerText = Math.floor(seoScore) + "%";
        document.getElementById("density").innerText = density + "%";
        document.getElementById("top3").innerText = topWords;
        document.getElementById("para").innerText = paragraphs.length;
        document.getElementById("read").innerText = readability;
        document.getElementById("seoBar").style.width = Math.floor(seoScore) + "%";
document.getElementById("densityBar").style.width = Math.min(density, 10) * 10 + "%";

let readValue = readability === "Excellent" ? 90 :
                readability === "Good" ? 70 :
                readability === "Average" ? 50 : 30;

document.getElementById("readBar").style.width = readValue + "%";

      }
