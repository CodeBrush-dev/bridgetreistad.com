// Single-file SEO snippet (CONFIG + META_DATA + LD_DATA + runtime)

(function () {
  "use strict";


  const CONFIG = {
    baseUrlFallback: "https://www.bridgetreistad.com",
    googleSiteVerification: ""
  };

  // === DATA (from your previous meta-tags.js) ===
  const META_DATA = {"meta_tags_list":[{"page_url":"https://www.bridgetreistad.com/","title_tag":"Hundredth Day of School Book | Bridget Reistad","meta_description":"Award-winning children's author in Minnesota. Celebrate the 100th Day of School with Hundredth Day Disaster, a picture book perfect for classroom celebrations and K-12 education resources."},{"page_url":"https://www.bridgetreistad.com/about-bridget","title_tag":"Children's Author Minnesota | Bridget Reistad","meta_description":"Bridget Reistad is a Minnesota children's author and former K-12 educator and librarian who writes rhyming children's literature and creative writing for kids."},{"page_url":"https://www.bridgetreistad.com/classroom-resources","title_tag":"K-12 Education Resources | Bridget Reistad","meta_description":"Free printables and activities for the Hundredth Day of School: counting sheets, crowns, 100 Words poems, abacus DIYs and quick t-shirt ideas—K-12 education resources for classroom celebrations."},{"page_url":"https://www.bridgetreistad.com/reviews","title_tag":"Children's Book Awards & Reviews | Bridget Reistad","meta_description":"Read reviews and awards for Hundredth Day Disaster, an acclaimed children's book praised for counting concepts and comedy—ideal for the 100th day of school and classroom celebrations."},{"page_url":"https://www.bridgetreistad.com/book-shop","title_tag":"100th Day of School Book Shop | Bridget Reistad","meta_description":"Order Hundredth Day Disaster, an award-winning children's book about the 100th day of school. Perfect for classroom celebrations, K-12 education resources, and creative writing for kids."},{"page_url":"https://www.bridgetreistad.com/contact","title_tag":"Contact Children's Author | Bridget Reistad","meta_description":"Contact Bridget Reistad, a Minnesota children's author, for questions, school visits, book orders, or ideas for classroom celebrations and K-12 education resources."}],"keywords":["Children's Author Minnesota","Hundredth Day of School","100th Day of School","K-12 Education Resources","Children's Book Awards","Classroom Celebrations","Children's Literature","Creative Writing for Kids","100 days"]};

  // === DATA (from your previous LD.js) ===
  const LD_DATA = {
  "@context": "https://schema.org",
  "@type": "Book",
  "name": "100th day",
  "alternateName": "Hundredth Day Disaster",
  "url": "https://www.bridgetreistad.com/",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://www.bridgetreistad.com/"
  },
  "description": "The 100th day of school arrives, but one classroom isn't celebrating. The principal learns they've miscalculated the day and now their beloved teacher is in trouble! Who will save the Hundredth Day?",
  "image": "https://static.wixstatic.com/media/23a440_2fb56fe63d3b4370b6afec59e481a828~mv2_d_3300_2710_s_4_2.jpg/v1/crop/x_182,y_88,w_3003,h_2474/fill/w_631,h_520,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Hundredth%20Day%20BookCover3d.jpg",
  "author": {
    "@type": "Person",
    "name": "Bridget Reistad",
    "url": "https://www.bridgetreistad.com/about-bridget",
    "description": "For over 25 years she has worked as an educator and librarian in K-12, public and academic libraries. An avid reader, her goal as an author is to inspire a love of literature in children. Bridget lives in northern Minnesota and enjoys doodling and writing in rhyme."
  },
  "award": [
    "MiPA Picture Book Award",
    "Benjamin Franklin Silver Award"
  ],
  "review": [
    {
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": "K.R., Librarian"
      },
      "reviewBody": "I loved LOVED! reading about the hundred days in this delightfully whimsical story. A solid children's book to be read even when it's not the 100th day of school."
    },
    {
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": "K.McK., Reading Specialist"
      },
      "reviewBody": "My students loved your book!"
    },
    {
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": "M. J. H., Parent"
      },
      "reviewBody": "100 thumbs up!"
    },
    {
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": "K. T., Elementary School Principal"
      },
      "reviewBody": "The kindergarten kids loved the story!"
    },
    {
      "@type": "Review",
      "author": {
        "@type": "Organization",
        "name": "Kirkus Review"
      },
      "reviewBody": "The counting concepts and comedy make this a perfect 100th day read-aloud."
    },
    {
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": "M.H., First grade teacher"
      },
      "reviewBody": "Today was the Hundredth Day and the kids loved the book!"
    }
  ]
};

  /* ===== Helpers ===== */
  function clamp(str, max) {
    if (typeof str !== "string") str = String(str ?? "");
    return str.length <= max ? str : str.slice(0, Math.max(0, max - 1)) + "…";
  }

  function stripTrailingSlash(p) {
    if (!p) return "/";
    return p.length > 1 && p.endsWith("/") ? p.slice(0, -1) : p;
  }

  function normalizePathFromUrl(url) {
    try {
      const u = new URL(url);
      return stripTrailingSlash(u.pathname || "/");
    } catch {
      const m = String(url || "").match(/^https?:\/\/[^/]+(\/[^?#]*)?/i);
      return stripTrailingSlash((m && m[1]) || "/");
    }
  }

  function removeLangPrefix(pathname) {
    const m = String(pathname || "/").match(
      /^\/([a-z]{2}(?:-[A-Z]{2})?)(?=\/|$)(.*)$/
    );
    if (!m) return pathname || "/";
    const rest = stripTrailingSlash(m[2] || "/");
    return rest || "/";
  }

  function currentPagePath() {
    const path = window.location.pathname || "/";
    return stripTrailingSlash(path || "/");
  }

  function currentKeyCandidates() {
    const path = currentPagePath();
    const origin = (window.location.origin || "").replace(/\/$/, "");
    const full = origin + path;

    if (path === "/") {
      return [full, "/"];
    }

    const noLang = removeLangPrefix(path);
    return [full, path, stripTrailingSlash(path), noLang, stripTrailingSlash(noLang)];
  }

  function buildIndex(metaJson) {
    const list = (metaJson && metaJson.meta_tags_list) || [];
    const index = {};
    for (const item of list) {
      const path = normalizePathFromUrl(item.page_url);
      let origin = "";
      try {
        origin = new URL(item.page_url).origin;
      } catch {
        origin = "";
      }
      const full = origin ? origin.replace(/\/$/, "") + path : "";

      const entry = {
        title: item.title_tag || "",
        description: item.meta_description || "",
      };

      index[path] = entry;
      index[stripTrailingSlash(path)] = entry;
      if (full) index[full] = entry;
    }
    return index;
  }

  function _stripQuotes(s) {
    return String(s ?? "")
      .replace(/["'“”‘’„«»]/g, "")
      .replace(/\s+/g, " ")
      .replace(/^[\s\-–—·,;:]+|[\s\-–—·,;:]+$/g, "")
      .trim();
  }

  function normalizeKeywordsList(input, opts) {
    const { maxKeywords = 20 } = opts || {};
    if (input == null) return [];
    let items = Array.isArray(input)
      ? input.slice()
      : typeof input === "string"
      ? input.split(",")
      : [];
    const seen = new Set();
    return items
      .map(_stripQuotes)
      .filter((s) => s && s.length >= 2)
      .filter((s) => {
        const k = s.toLowerCase();
        if (seen.has(k)) return false;
        seen.add(k);
        return true;
      })
      .slice(0, maxKeywords);
  }

  function normalizeKeywords(input, opts) {
    const { maxKeywords = 20, maxLength = 280 } = opts || {};
    const list = normalizeKeywordsList(input, { maxKeywords });
    const content = list.join(", ");
    return content.length > maxLength ? content.slice(0, maxLength) : content;
  }

  function applyAltFallbacks(keywordsPool) {
    if (!Array.isArray(keywordsPool) || keywordsPool.length === 0) return;
    try {
      const images = Array.from(document.querySelectorAll("img"));
      let i = 0;
      images.forEach((img) => {
        const curAlt = (img.getAttribute("alt") || "").trim().toLowerCase();
        const shouldReplace =
          !curAlt ||
          curAlt.endsWith(".jpg") ||
          curAlt.endsWith(".png") ||
          curAlt === "image" ||
          curAlt === "img";
        if (shouldReplace) {
          img.setAttribute("alt", keywordsPool[i % keywordsPool.length]);
          i++;
        }
      });
    } catch {
      /* ignore */
    }
  }

  function optimizeImages() {
    try {
      const images = Array.from(document.querySelectorAll("img"));
      if ("IntersectionObserver" in window) {
        const io = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const img = entry.target;
              io.unobserve(img);
              // hook for tracking / lazy work if needed
            }
          });
        });
        images.forEach((img, index) => {
          if (index > 0) io.observe(img);
        });
      }
    } catch (err) {
      console.error("Image optimization error:", err);
    }
  }

  function upsertMeta(nameOrProperty, content, useProperty) {
    const selector = useProperty
      ? `meta[property="${nameOrProperty}"]`
      : `meta[name="${nameOrProperty}"]`;
    let el = document.head.querySelector(selector);
    if (!el) {
      el = document.createElement("meta");
      if (useProperty) el.setAttribute("property", nameOrProperty);
      else el.setAttribute("name", nameOrProperty);
      document.head.appendChild(el);
    }
    el.setAttribute("content", content);
  }

  function upsertLink(rel, href) {
    let link = document.head.querySelector(`link[rel="${rel}"]`);
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", rel);
      document.head.appendChild(link);
    }
    link.setAttribute("href", href);
  }

  function injectJsonLd(ldObject) {
    if (!ldObject) return;
    try {
      const existing = Array.from(
        document.head.querySelectorAll('script[type="application/ld+json"]')
      );
      existing.forEach((el) => {
        el.parentNode.removeChild(el);
      });

      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(ldObject);
      document.head.appendChild(script);
    } catch (err) {
      console.error("Error injecting JSON-LD:", err);
    }
  }

  function applyJsonLd() {
    injectJsonLd(LD_DATA);
  }

  function applySeoFromJson() {
    try {
      const metaJson = META_DATA;
      const index = buildIndex(metaJson);

      const path = currentPagePath();
      const isHome = path === "/";

      const fallbackBase =
        (CONFIG && CONFIG.baseUrlFallback) ? CONFIG.baseUrlFallback : "";
      const baseUrl = (window.location.origin || fallbackBase).replace(/\/$/, "");
      const canonicalUrl = baseUrl + path;

      const keys = currentKeyCandidates();
      let entry = null;
      for (const k of keys) {
        if (index[k]) {
          entry = index[k];
          break;
        }
      }

      if (!entry) {
        return normalizeKeywordsList(metaJson.keywords, { maxKeywords: 25 });
      }

      const title = clamp(entry.title, 60);
      const desc = clamp(entry.description, 185);

      document.title = title;

      const metaList = [
        { type: "name", key: "description", content: desc },
        { type: "property", key: "og:url", content: canonicalUrl },
        { type: "name", key: "resource-hints", content: "preload" },
        { type: "name", key: "format-detection", content: "telephone=yes" },
        { type: "name", key: "mobile-web-app-capable", content: "yes" },
        { type: "name", key: "apple-mobile-web-app-capable", content: "yes" },
      ];

      // opcjonalnie dodaj google-site-verification, jeśli jest w CONFIG
      if (CONFIG && CONFIG.googleSiteVerification) {
        metaList.push({
          type: "name",
          key: "google-site-verification",
          content: CONFIG.googleSiteVerification
        });
      }

      if (isHome && metaJson && metaJson.keywords) {
        const kwContent = normalizeKeywords(metaJson.keywords, {
          maxKeywords: 25,
          maxLength: 512,
        });
        if (kwContent) {
          metaList.push({ type: "name", key: "keywords", content: kwContent });
        }
      }

      metaList.forEach((m) => {
        upsertMeta(m.key, m.content, m.type === "property");
      });

      upsertLink("canonical", canonicalUrl);

      return normalizeKeywordsList(metaJson.keywords, { maxKeywords: 25 });
    } catch (err) {
      console.error("Error meta settings:", err);
      return [];
    }
  }

  function initSnippetSEO() {
    const keywordsPool = applySeoFromJson();
    const path = currentPagePath();
    if (path === "/") {
      applyJsonLd();
    }
    optimizeImages();
    applyAltFallbacks(keywordsPool);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initSnippetSEO);
  } else {
    initSnippetSEO();
  }
})();
